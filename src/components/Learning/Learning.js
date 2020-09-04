import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import { withRouter } from 'react-router-dom';
import './Learning.css';

class Learning extends Component {
  static contextType = UserContext;
  handleChange(e) {
    this.context.setGuess(e.target.value);
  }

  render() {
    const { language } = this.context.dashboard;
    const { head } = this.context;
    const ResultButton = withRouter(({ history }) => (
      <input
        name='button'
        id='result'
        type='button'
        value='Guess'
        onClick={() => {
          history.push('/result');
        }}
      />
    ));
    return (
      <div>
        <div id='current_word'>
          {`Learning ${language.name} is fun! Here's your first word: ${head.wordsDetails.nextWord}`}
        </div>
        <div id='correct_count'>{`Correct guesses: ${head.wordsDetails.correct_count}`}</div>
        <div id='incorrect_count'>{`Incorrect guesses: ${head.wordsDetails.incorrect_count}`}</div>
        <div id='score'>{`Score: ${head.wordsDetails.totalScore}`}</div>
        <form>
          <input
            type='text'
            name='guess'
            onChange={(e) => this.handleChange(e)}
            required
          ></input>
          <ResultButton />
        </form>
      </div>
    );
  }
}

export default Learning;
