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
    const wordList = await LanguageService.getLanguageWords(
      req.app.get('db'),
      req.language.id
    );

	// const guess=req.body.guess.toLowerCase();
	const answer=(wordList.find(word=>word.id==currentLanguage.head)).translation.toLowerCase()
	const originalAnswer=(wordList.find(word=>word.id==currentLanguage.head)).original
	
	
	//console.log(answer)
    if (!req.body.guess) {
      res.status(400).json({ error: "Missing 'guess' in request body" }).end();
    }
    if (req.body.guess.toLowerCase() === answer) {
      res.status(200).json({ response: 'correct' }).end();
    }
    if (req.body.guess.toLowerCase() !== answer) {
		const somehead = await LanguageService.getLanguageHead(
      		req.app.get('db'),
      		req.language.id
    	);
		console.log(somehead)
		newObj={
			answer:answer,
			isCorrect:false,
			nextWord:originalAnswer,
			totalScore:currentLanguage.totalScore,
			wordCorrectCount:somehead.correct_count,
			wordIncorrectCount:somehead.incorrect_count
		}
      res.status(200).json(newObj).end();
    } else {
      res.status(500).end();
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = languageRouter;
