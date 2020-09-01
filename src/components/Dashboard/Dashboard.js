import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
// import Button from '../Button/Button';
import './Dashboard.css';

class Dashboard extends Component {
	static contextType = UserContext;

	

	render() {
		const language = this.context.dashboard.language;
		const words = this.context.dashboard.words;
		console.log(language.name);			
		return (
			<div>
				<ul>
					<li>Language: {language.name}</li>
					<li>
						Words
						<ul>
							<li>word 1:</li>
							<li>word 2:</li>
							<li>word 3:</li>
							<li>word 4:</li>
						</ul>
					</li>
					<li>Score: </li>
				</ul>
			</div>
		);
	}
}

export default Dashboard;
