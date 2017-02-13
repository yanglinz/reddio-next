import React from 'react';
import ReactDOM from 'react-dom';

import RootProvider from './components/apollo';
import HomeTopSubreddits from './screens/home/top-subreddits';

window.React = React;
window.ReactDOM = ReactDOM;

window.modules = {
  RootProvider,
  HomeTopSubreddits
};
