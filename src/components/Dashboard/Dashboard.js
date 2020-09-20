import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import { withRouter } from 'react-router-dom';
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
			onClick={()=>{history.push('/learn');}}
		/>
    ));
    return (
      <section id='dashboard-section'>
	  	<h2>My Language:</h2>
		<h2>{language.name}</h2>
		<h2>Words:</h2>
            <ul>
              {words.map((word, index) => (
                <li key={index}>
                  {/* <div>{`${word.translation} = ${word.original}`}</div> */}
                  <div>{word.original}</div>
                  <div>Correct: {word.correct_count}</div>
                  <div>Incorrect: {word.incorrect_count}</div>
                </li>
              ))}
          <li>Total correct answers: {language.total_score}</li>
        </ul>
        <StartLearningButton />
      </section>
    );
  }
}

export default Dashboard;
