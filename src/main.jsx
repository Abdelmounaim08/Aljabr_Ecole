import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {  applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import { createStore } from 'redux';
const rootReducer = combineReducers({

  auth: authReducer,
});

const store = createStore(rootReducer,applyMiddleware(thunk));


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> <App /></Provider>
  </React.StrictMode>,
)
