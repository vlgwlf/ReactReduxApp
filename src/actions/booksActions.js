"use strict";
import axios from 'axios';

//GET BOOKS
export function getBooks(){
    return function(dispatch){
      axios.get("/books")
      .then(function(response){
        dispatch({type:"GET_BOOKS", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"GET_BOOKS_REJECTED", payload:err})
      })
    }
}


//POST BOOKS
export function postBooks(book){
  return function(dispatch){
    axios.post("/books", book)
    .then(function(response){
      dispatch({type:"POST_BOOK", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"POST_BOOK_REJECTED", payload:"There was an error posting your book."})
    })
  }

}


//DELETE BOOKS
export function deleteBooks(id){
    return {
        type:"DELETE_BOOK",
        payload: id
    };
}

//UPDATE BOOKS
export function updateBooks(book){
    return {
        type:"UPDATE_BOOK",
        payload:book
    }
}
