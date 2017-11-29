import React from 'react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Main from './Main';


const history = createBrowserHistory();

const router = (props) => {
  return (
    <Router history={history}>
      <Main history={history} />
    </Router>
  )
}

export default router;
