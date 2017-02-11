import React from 'react';
import ReactDOM from 'react-dom';

import RootProvider from './apollo';
import ExampleData from './example';

window.React = React;
window.ReactDOM = ReactDOM;

window.modules = {
  RootProvider,
  ExampleData
};
