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
	try { //console.log(req.body)
		if (!req.body.guess) {
			res.status(400).json({ error: "Missing 'guess' in request body" }).end();
		} else if (req.body.guess) {
			const currentLanguage = await LanguageService.getUsersLanguage(
				req.app.get('db'),
				req.language.user_id
			);
			const tmpWordsList=await LanguageService.getLanguageWords(
				req.app.get('db'),
				req.language.id
			);
			const wordList=LanguageService.generateLinkedList(tmpWordsList,currentLanguage.head);
			const guess = req.body.guess.toLowerCase();
			const currentWord = wordList.head.value;
			const correctAnswer = currentWord.translation.toLowerCase();
			const nextWord = wordList.head.next.value;
			let totalScore = currentLanguage.total_score;
			let isCorrect=false;
			if (guess === correctAnswer) {
				//double the value of m
				currentWord.memory_value=(wordList.head.value.memory_value+wordList.head.value.memory_value);
				//set is correct
				isCorrect = true;
				//increment the correct count
				currentWord.correct_count++;
				//increment total_score
				totalScore++;
			} else if (guess !== correctAnswer) {
				//reset m to 1
				currentWord.memory_value = 1;
				currentWord.incorrect_count++;
			}
			wordList.move(currentWord.memory_value);
			// update language table based on req.language.id
			LanguageService.updateLanguageTable(
				req.app.get('db'),
				req.language.id,
				wordList.head.value.id,
				totalScore
			);
			// update the word table based on the current word
			LanguageService.updateWordTable(
				req.app.get('db'),
				wordList,
				currentWord.memory_value,
				currentWord.id,
			)
			returnWordObj = {
				answer: correctAnswer,
				isCorrect: isCorrect,
				nextWord: nextWord.original,
				totalScore: totalScore,
				wordCorrectCount: currentWord.correct_count,
				wordIncorrectCount: currentWord.incorrect_count,
			};
			res.status(200).json(returnWordObj).end();	
		} else {
			res.status(500).end();
		}
		next();
	} catch (error) {
		next(error);
	}
});

module.exports = languageRouter;
