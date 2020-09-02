const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');

const languageRouter = express.Router();

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
	
	const wordList=await LanguageService.getLanguageWords(req.app.get('db'), req.language.id)
	const nextWord=wordList.find(word=>word.id==req.language.head)
    
	res.json({
		wordsDetails:{
     	 	totalScore: req.language.total_score,
			correct_count: wordDetails.correct_count,
			incorrect_count: wordDetails.incorrect_count,
			nextWord: nextWord.original,
		}
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.post('/guess', async (req, res, next) => {
  // implement me
  res.send('implement me!');
});

module.exports = languageRouter;
