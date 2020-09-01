import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import { withRouter } from 'react-router-dom';
// import Button from '../Button/Button';
import './Dashboard.css';

class Dashboard extends Component {
  static contextType = UserContext;

  render() {
    const { language, words } = this.context.dashboard;
    const StartLearningButton = withRouter(({ history }) => (
      <input
        name='button'
        id='start-learning'
        type='button'
        value='Start Learning'
        onClick={() => {
          history.push('/learn');
        }}
      />
    ));
    return (
      <div>
        <ul>
          <li>Language: {language.name}</li>
          <li>
            Words
            <ul>
              {words.map((word, index) => (
                <li key={index}>
                  <div>{`${word.translation} = ${word.original}`}</div>
                  <div>Correct: {word.correct_count}</div>
                  <div>Incorrect: {word.incorrect_count}</div>
                </li>
              ))}
            </ul>
          </li>
          <li>Score: {language.total_score}</li>
        </ul>
        <StartLearningButton />
      </div>
    );
  }
}

export default Dashboard;
