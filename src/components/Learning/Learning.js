import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import LanguageService from '../../services/lang-service.js';
import { withRouter } from 'react-router-dom';
import './Learning.css';

class Learning extends Component {
  constructor(props) {
    super(props);
    state: {
      guess: '';
    }
  }
  static contextType = UserContext;
  handleChange(e) {
    this.setState({ guess: e.target.guess.value });
  }

  render() {
    const { language } = this.context.dashboard;
    const { head } = this.context;
    const ResultButton = withRouter(({ history }) => (
      <input
        name='button'
        id='result'
        type='submit'
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            LanguageService.postGuess(e.target.guess.value);
          }}
        >
          <input
            type='text'
            name='guess'
            onChange={handleChange}
            required
          ></input>
          <button type='submit'>Guess</button>
          <ResultButton />
        </form>
      </div>
    );
  }
}

export default Learning;
