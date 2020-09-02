const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');

const languageRouter = express.Router();
const jsonBodyParser = express.json();

languageRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get('db'),
      req.user.id
    );

    if (!language)
      return res.status(404).json({
        error: `You don't have any languages`,
      });

    req.language = language;
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get('/', async (req, res, next) => {
  try {
    const words = await LanguageService.getLanguageWords(
      req.app.get('db'),
      req.language.id
    );

    res.json({
      language: req.language,
      words,
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get('/head', async (req, res, next) => {
  try {
    const wordDetails = await LanguageService.getLanguageHead(
      req.app.get('db'),
      req.language.id
    );

    const wordList = await LanguageService.getLanguageWords(
      req.app.get('db'),
      req.language.id
    );
    const nextWord = wordList.find((word) => word.id == req.language.head);

    res.json({
      wordsDetails: {
        totalScore: req.language.total_score,
        correct_count: wordDetails.correct_count,
        incorrect_count: wordDetails.incorrect_count,
        nextWord: nextWord.original,
      },
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.post('/guess', jsonBodyParser, async (req, res, next) => {
  try {
    const currentLanguage = await LanguageService.getUsersLanguage(
      req.app.get('db'),
      req.language.user_id
    );
    const answer = await LanguageService.getLanguageWords(
      req.app.get('db'),
      req.language.id
    );
    if (!req.body.hasOwnProperty('guess')) {
      res.status(400).json({ error: "Missing 'guess' in request body" }).end();
    }
    if (
      req.body.guess.toLowerCase() ===
      answer[currentLanguage.head - 1].translation.toLowerCase()
    ) {
      res.status(200).json({ response: 'correct' }).end();
    }
    if (
      req.body.guess.toLowerCase() !==
      answer[currentLanguage.head - 1].translation.toLowerCase()
    ) {
      res.status(200).json({ response: 'incorrect' }).end();
    } else {
      res.status(500).end();
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = languageRouter;
