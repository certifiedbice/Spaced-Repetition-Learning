import React, { Component } from 'react';
import AuthApiService from '../services/auth-api-service';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';

const UserContext = React.createContext({
  user: {},
  correctAnswer: '',
  dashboard: {},
  head: {},
  redirect: false,
  error: null,
  checkGuess: () => {},
  setDashboard: () => {},
  setHead: () => {},
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  setCorrectAnswer: () => {},
  processLogin: () => {},
  processLogout: () => {},
});

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    const state = {
      user: {},
      guess: '',
	  correctAnswer: '',
      dashboard: {
        language: {
          name: '',
          head: 0,
          id: 0,
          total_score: 0,
          user_id: 0,
        },
        words: [
          {
            correct_count: 0,
            id: 0,
            incorrect_count: 0,
            language_id: 0,
            memory_value: 0,
            next: 0,
            original: '',
            translation: '',
          },
        ],
      },
      head: {
        wordsDetails: {
          totalScore: 0,
          correct_count: 0,
          incorrect_count: 0,
          nextWord: '',
        },
      },
      error: null,
    };

    const jwtPayload = TokenService.parseAuthToken();

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      };

    this.state = state;
    IdleService.setIdleCallback(this.logoutBecauseIdle);
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  checkGuess = (guess) => {
    const answer = this.state.dashboard.words.find(
      (word) => word.original === this.state.head.wordsDetails.nextWord
    );
    if (guess.toLowerCase() === answer.translation.toLowerCase()) {
      console.log('correct');
      return { guess: 'correct' };
    } else {
      console.log('incorrect');
      return { guess: 'incorrect' };
    }
  };

  setDashboard = (data) => {
    this.setState({ dashboard: data });
  };

  setHead = (data) => {
    this.setState({ head: data });
  };

  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setUser = (user) => {
    this.setState({ user });
  };

  setGuess = (guess) => {
    this.setState({ guess: guess });
  };

  setCorrectAnswer = (correctAnswer) => {
    this.setState({ correctAnswer: correctAnswer });
  };
  
  processLogin = (authToken) => {
    TokenService.saveAuthToken(authToken);
    const jwtPayload = TokenService.parseAuthToken();
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
    });
    IdleService.regiserIdleTimerResets();
    TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken();
    });
  };

  processLogout = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.setUser({});
  };

  logoutBecauseIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.setUser({ idle: true });
  };

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken();
        });
      })
      .catch((err) => {
        this.setError(err);
      });
  };

  render() {
    const value = {
      user: this.state.user,
      guess: this.state.guess,
	  correctAnswer:this.state.correctAnswer,
      redirect: this.state.redirect,
      error: this.state.error,
      dashboard: this.state.dashboard,
      head: this.state.head,
      setDashboard: this.setDashboard,
      checkGuess: this.checkGuess,
      setHead: this.setHead,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      setGuess: this.setGuess,
	  setCorrectAnswer: this.setCorrectAnswer,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
    };
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
