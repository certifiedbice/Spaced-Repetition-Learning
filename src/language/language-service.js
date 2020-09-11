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
		// new linked list instance
		const wordsObjList = new LinkedList();

		// the original head before linked list generation
		let originalHead=head;

		// counter for while loop
		let counter = words.length;

		// decrementing loop that builds the linked list
		while (counter > 0) {
			// console.log(counter)
			// this is the current word obj
			currentWordObj=words.find((object)=>object.id===head);
			
			// points the last word obj back to the first in the list
			// if(counter===1)currentWordObj.next=originalHead;
			
			// inserts into the linked list
			wordsObjList.insertLast(words.find((object)=>object.id===head));

			// update head
			if(currentWordObj.next!==null){head=currentWordObj.next}
		
			// decrement the counter
			counter--;
		}
		return wordsObjList;
	},
	async updateLanguageTable(db,id,head,totalScore){
		await db
		.from('language')
		.where({id:id})
		.update({head: head, total_score: totalScore})
	},
	async updateWordTable(db,wordList,mem_val,currId){
		// create array from wordList
		let tmpArray=[];
		while(wordList.head.next!==null){
			tmpArray.push(wordList.head)
			wordList.head=wordList.head.next;
		}
		// persist to database
		for(let i=0;i<tmpArray.length;i++){
			// Assign the memory value before persist
			if(tmpArray[i].value.id===currId){
				tmpArray[0].value.memory_value=mem_val;
			}
			// this is the current word obj
			currentWordObj=tmpArray[i];
			
			// meat and potatos
			await db
			.from('word')
			.where({id:currentWordObj.value.id})
			.update({memory_value: currentWordObj.value.memory_value, correct_count: currentWordObj.value.correct_count, incorrect_count: currentWordObj.value.incorrect_count, next: currentWordObj.value.next})
		}
	},
};

module.exports = LanguageService;
