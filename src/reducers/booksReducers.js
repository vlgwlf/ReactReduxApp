"use strict";

//BOOK REDUCERS
export function booksReducers(state={
  books:    
    [{
        _id: 1,
        title: 'Book 1 Title',
        description: 'Weird ass book',
        price: 44
    },
    {
        _id: 2,
        title: 'Book 2 Title',
        description: 'Weirder ass book',
        price: 35
  }]
}, action){
    // State must have a default value
    switch(action.type){
        case "POST_BOOK":
        // let books = state.books.concat(action.payload);
        // return {books};
        return {books:[...state.books, ...action.payload]};
        break;
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
        /* Use the clice method to remove the book at the specified index, replace with the new object
        and concatenate with the rest of the items in the array */
        return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
        ...currentBookToUpdate.slice(indexToUpdate + 1)]};
        break;

        case "GET_BOOK":
        return {...state,books:[...state.books]}
    }
    return state    
}