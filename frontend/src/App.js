import React from 'react';
import Router from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './redux';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
