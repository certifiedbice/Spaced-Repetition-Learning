import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Learning extends Component {
  render() {
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
    return (
      <div>
        That was right or wrong, not sure yet!
        <NextWord />
      </div>
    );
  }
}

export default Learning;
