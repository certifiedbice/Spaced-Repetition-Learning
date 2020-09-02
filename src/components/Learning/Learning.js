import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
// import LanguageService from '../../services/lang-service';
import './Learning.css';

class Learning extends Component {
  static contextType = UserContext;

  // componentDidMount() {
  //   const head = LanguageService.getLanguageHead();
  //   console.log(head);
  // }

  render() {
    const { language, words } = this.context.dashboard;
    return (
      <div>
        Learning {language.name} is fun! Here's your first word:
        {words.map((word, index) => {
          if (index === 0) {
            return word.translation;
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}

export default Learning;
