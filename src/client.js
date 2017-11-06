"use strict"
//REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
//REACT-ROUTER
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
//Import combined reducers
import reducers from './reducers/index';

//Import actions
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

//Import Store & Middleware
const middleware = applyMiddleware(thunk, logger);
// PASS INITIAL STATE FROM SERVER STORE
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);
import routes from './routes';
const Routing = (
  <Provider store={store}>
    {routes}
  </Provider>
);
//console.log({BooksList})
render(
    Routing, document.getElementById('app')
);
