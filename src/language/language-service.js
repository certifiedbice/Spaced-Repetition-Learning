const LinkedList = require('../linkedlist/linklist');

const LanguageService = {
  	getUsersLanguage(db, user_id) {
		return db
		.from('language')
		.select(
			'language.id',
			'language.name',
			'language.user_id',
			'language.head',
			'language.total_score'
		)
		.where('language.user_id', user_id)
		.first();
  	},

  	getLanguageWords(db, language_id) {
		return db
			.from('word')
			.select(
				'id',
				'language_id',
				'original',
				'translation',
				'next',
				'memory_value',
				'correct_count',
				'incorrect_count'
			)
			.where({ language_id });
  	},

  	getLanguageHead(db, language_id) {
		return db
			.from('word')
			.first()
			.select('next', 'memory_value', 'correct_count', 'incorrect_count')
			.where({ language_id });
  	},

	generateLinkedList(words,head) {
		const memoryValues = new LinkedList();
		let nextValue= words.find((object)=>object.id===head);
			
		// console.log(nextValue);
		
		// let nextObj=words.find((object)=>object.id===nextValue.next)
		let nextObj=words.find((object)=>object.id===nextValue.next)

		// console.log(nextObj)
		
		let counter = words.length;
		while (counter > 0) {
			memoryValues.insertLast(
				words.find((object)=>object.id===head)
			);

			//update head
			head=words.find((object)=>object.id===nextValue.next).next
			console.log(head)

			counter--;
		}
		return memoryValues;
	},
};

module.exports = LanguageService;
