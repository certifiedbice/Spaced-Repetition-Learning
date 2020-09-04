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

  generateLinkedList(words) {
    const memoryValues = new LinkedList();
    let nextValue = 2;
    let counter = words.length - 1;
    while (counter > 0) {
      memoryValues.insertLast(
        words.find((object) => object.next === nextValue && object !== null)
        // words.forEach((object) => console.log(object))
      );
      counter--;
      nextValue++;
    }
    return memoryValues;
  },
};

module.exports = LanguageService;
