import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import LanguageService from '../../services/lang-service.js';

class Learning extends Component {
  static contextType = UserContext;
  state = {
    'answer': this.context.dashboard.words.find(wordObj=>this.context.correctAnswer===wordObj.original).translation,
    'isCorrect': false,
    'nextWord': this.context.correctAnswer,
    'totalScore': 0,
    'wordCorrectCount': 0,
    'wordIncorrectCount': 0,
  };
  async componentDidMount() {
	let res=await LanguageService.postGuess(this.context.guess);
	if(res!==undefined){
		this.setState({
			isCorrect:res.isCorrect,
			totalScore:res.totalScore,
			wordCorrectCount:res.wordCorrectCount,
			wordIncorrectCount:res.wordIncorrectCount
		});
  	}
  }
  render() {
    const {
      answer,
      isCorrect,
      nextWord,
      totalScore,
      wordCorrectCount,
      wordIncorrectCount,
    } = this.state;
    const NextWord = withRouter(({ history }) => (
      <input
        name='button'
        id='result'
        type='submit'
        value='Next Word'
        onClick={() => {
          history.push('/learn');
        }}
      />
    ));
	const DashButton = withRouter(({ history }) => (
      <input
        name='button'
        id='dashbutton'
        type='button'
        value='Return to dashboard'
        onClick={() => {
          history.push('/');
        }}
      />
    ));
    if (answer === '') {
      return <div>Error! Return to dashboard </div>;
    }
    return (
      <div>
        <div>{isCorrect ? 'Correct! 😊' : 'Incorrect 😞'}</div>
        <div>
          The translation of <i>{nextWord}</i> is "{answer}"
        </div>
        <div>
          {wordCorrectCount === 0
            ? 'You have not guessed right yet!'
            : `You have guessed this word correctly ${wordCorrectCount} time${
                wordCorrectCount === 1 ? '' : 's'
              }`}
        </div>
        <div>
          {wordIncorrectCount === 0
            ? 'You have not guessed wrong yet!'
            : `You have guessed this word incorrectly ${wordIncorrectCount} time${
                wordIncorrectCount === 1 ? '' : 's'
              }`}
        </div>
        <div>Score: {totalScore}</div>
        <NextWord />
        <DashButton />
      </div>
    );
  }
}

export default Learning;
