"use strict";

//BOOK REDUCERS
export function booksReducers(state={
  books:[]
}, action){
    // State must have a default value
    switch(action.type){
        case "POST_BOOK":
        // let books = state.books.concat(action.payload);
        // return {books};
        return {books:[...state.books, ...action.payload], msg:'Saved! Click to continue',
        style:'success', validation:'success'};
        break;
        case "POST_BOOK_REJECTED":
          return{...state, msg:'Please try again.', style:'danger', validation:'error'}
        case "DELETE_BOOK":
        // Create a copy of the current array of books
        const currentBookToDelete = [...state.books]
        // Find the index of the book you want to delete
        const indexToDelete = currentBookToDelete.findIndex(
            function(book){
                return book._id == action.payload;
            }
        );
        //use slice to remove the book at the specified index
        return {books: [...currentBookToDelete.slice(0, indexToDelete),
        ...currentBookToDelete.slice(indexToDelete+1)]};
        break;

        case "UPDATE_BOOK":
        // Create a copy of the current array of books
        const currentBookToUpdate = [...state.books]
        // Determine which book to update
        const indexToUpdate = currentBookToUpdate.findIndex(
            function(book){
                return book._id.toString() === action.payload._id;
            }
        );
        /* Create a new book object with new values and same array index of the item to replace,
        to do this use the "...spread" function, but it can also be done with "concat" */
        const newBookToUpdate = {
            ...currentBookToUpdate[indexToUpdate],
            title: action.payload.title
        }
        // This log shows you the new book object in the console
        console.log("Updated book", newBookToUpdate);
        /* Use the slice method to remove the book at the specified index, replace with the new object
        and concatenate with the rest of the items in the array */
        return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
        ...currentBookToUpdate.slice(indexToUpdate + 1)]};
        break;

        case "GET_BOOKS":
        console.log(...action.payload);
        return {...state, books:[...action.payload]}

        case "RESET_BUTTON":
        return {...state, msg:null, style:"primary", validation:null}
    }
    return state
}
