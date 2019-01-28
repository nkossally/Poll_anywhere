import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';


import * as ChoiceActions from './actions/choice_actions';
import * as PollActions from './actions/poll_actions';

document.addEventListener('DOMContentLoaded', () => {



  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.create = ChoiceActions.create;
  window.show = ChoiceActions.show;
  window.showAll = ChoiceActions.showAll;
  window.destroy = ChoiceActions.destroy;

  window.showAll = PollActions.showAll;



  
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store }/>, root);
});
