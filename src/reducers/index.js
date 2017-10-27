"use strict";

import {combineReducers} from 'redux';

//Import reducers
import {booksReducers} from './booksReducers';
import {cartReducers} from './cartReducers';
//COMBINE REDUCERS
export default combineReducers({
    books: booksReducers,
    cart: cartReducers
});