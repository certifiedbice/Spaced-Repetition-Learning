import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import { withRouter } from 'react-router-dom';
import './Learning.css';

class Learning extends Component {
	static contextType = UserContext;
	handleChange(e) {
		if(e.keyCode===13&&e.target.value!==''&&e.target.value!==null&&e.target.value!==undefined){this.props.history.push('/result');}
		this.context.setCorrectAnswer(this.context.head.wordsDetails.nextWord);
		this.context.setGuess(e.target.value);
	}
	handleSubmit(e){e.preventDefault();}
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
		return (
			<div>
				<div id='current_word'>
				{`Learning ${language.name} is fun! Here's your first word: ${head.wordsDetails.nextWord}`}
				</div>
				<div id='correct_count'>{`Correct guesses: ${head.wordsDetails.correct_count}`}</div>
				<div id='incorrect_count'>{`Incorrect guesses: ${head.wordsDetails.incorrect_count}`}</div>
				<div id='score'>{`Score: ${head.wordsDetails.totalScore}`}</div>
				<form onSubmit={(e)=>{this.handleSubmit(e)}}>
				<input name='guess' type='text' required onKeyUp={(e)=>{this.handleChange(e)}}/>
				<ResultButton />
				<DashButton />
				</form>
			</div>
		);
	}
}

export default Learning;
