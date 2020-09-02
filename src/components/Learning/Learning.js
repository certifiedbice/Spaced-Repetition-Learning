import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import './Learning.css';

class Learning extends Component {
  static contextType = UserContext;

  render() {
    const { language } = this.context.dashboard;
    const { head } = this.context;
    return (
      <div>
        <div id='current_word'>
          {`Learning ${language.name} is fun! Here's your first word: ${head.wordsDetails.nextWord}`}
        </div>
        <div id='correct_count'>{`Correct guesses: ${head.wordsDetails.correct_count}`}</div>
        <div id='incorrect_count'>{`Incorrect guesses: ${head.wordsDetails.incorrect_count}`}</div>
        <div id='score'>{`Score: ${head.wordsDetails.totalScore}`}</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.context.checkGuess(e.target.guess.value);
          }}
        >
          <input type='text' name='guess' required></input>
          <button type='submit'>Guess</button>
        </form>
      </div>
    );
  }
}

export default Learning;
