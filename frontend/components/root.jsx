import React from 'react';
import { Provider } from 'react-redux';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './app';
import SessionFormContainer from './session/session_form_container';

const Root = ({ store }) => {
  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (!currentUser) {
      replace('login');
    }
  };

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('/search');
    }
  };

  const _goToSearchIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('search');
    }
  };

  return (
    <Provider store={ store }>
      <Router history={ hashHistory } onUpdate={() => window.scrollTo(0, 0)}>
        <Route path="/" component={ App }>
          <IndexRoute component={ GreetingContainer } />
          <Route path="login" component={ SessionFormContainer } onEnter={_redirectIfLoggedIn} />
          <Route path="signup" component={ SessionFormContainer } onEnter={_redirectIfLoggedIn} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;