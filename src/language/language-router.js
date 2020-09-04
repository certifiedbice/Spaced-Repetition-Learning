const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');
const LinkedList = require('../linkedlist/linklist');

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
		
		if (!req.body.guess) {
			res.status(400).json({ error: "Missing 'guess' in request body" }).end();
		}

		else if (req.body.guess) {
			const currentLanguage = await LanguageService.getUsersLanguage(req.app.get('db'),req.language.user_id);
			let wordList = LanguageService.generateLinkedList(await LanguageService.getLanguageWords(req.app.get('db'),req.language.id));
			
			wordList.print()
			const correctAnswer = wordList.head.value.translation.toLowerCase();

			const guess=req.body.guess.toLowerCase();
			const currentWord=wordList.head.value;
			const nextWord=wordList.head.next.value;
			let totalScore=currentLanguage.total_score;

			returnWordObj = {
				answer: correctAnswer,
				isCorrect: false,
				nextWord: nextWord.original,
				totalScore: totalScore,
				wordCorrectCount: currentWord.correct_count,
				wordIncorrectCount: currentWord.incorrect_count,
			};

			if (guess===correctAnswer) {
				//double the value of m
				currentWord.memory_value+=currentWord.memory_value;
				returnWordObj.isCorrect=true;
				returnWordObj.wordCorrectCount=currentWord.correct_count++;
				//increment total_score
				totalScore++;
				//incremement the returnWordObj totalScore value as well 
				returnWordObj.totalScore=totalScore;
			}
			
			else if (guess!==correctAnswer) {
				//reset m to 1
				currentWord.memory_value=1;
				returnWordObj.wordIncorrectCount=currentWord.incorrect_count++;
			}
			
			//move the node up m places in the linkedlist
			//wordList.move(null,null,currentWord.memory_value,currentWord.memory_value);

			

			//persist the list in the database
			//update the client

			
			// res.status(200).json(returnWordObj).end();
			res.status(200).end();
		}
		else {res.status(500).end();}
		next();
	} catch (error) {next(error);}
});

module.exports = languageRouter;
