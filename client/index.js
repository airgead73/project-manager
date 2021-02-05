import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './index.scss';
__webpack_nonce__ = process.env.NONCE;

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

