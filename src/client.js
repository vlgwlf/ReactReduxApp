"use strict"
//REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
//REACT-ROUTER
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
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
const store = createStore(reducers, middleware);

import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';

const Routing = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={BooksList} />
                <Route path="/admin" component={BooksForm} />
                <Route path="/cart" component={Cart} />
            </Route>
        </Router>
    </Provider>
);

render(
    Routing, document.getElementById('app')
);

//Step 2 define and dispatch actions
/*
store.dispatch(postBooks(

));

//DELETE a book
store.dispatch(deleteBooks(
    {id: 1}
));

// UPDATE a book
store.dispatch(updateBooks(
    {
        id: 2,
        title: 'Learn React in 24 hours'
    }
));


//---->> CART ACTIONS <<-----

//ADD to cart
store.dispatch(addToCart([{id: 1}]));
*/
