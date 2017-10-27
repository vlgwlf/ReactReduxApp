"use strict";

//CART REDUCERS

export function cartReducers(state={cart:[]}, action){
    switch(action.type){
        case "ADD_TO_CART":
            return {...state,
                cart:action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
            }
            break;
        case "DELETE_CART_ITEM":
            return {...state,
                cart:action.payload,
                totalAmount: totals(action.payload).amount
            }
            break;
        case "UPDATE_CART":
            // Create a copy of the current array of books
        const currentBookToUpdate = [...state.cart]
        // Determine which book to update
        const indexToUpdate = currentBookToUpdate.findIndex(
            function(book){
                return book._id === action._id;
            }
        );
        /* Create a new book object with new values and same array index of the item to replace,
        to do this use the "...spread" function, but it can also be done with "concat" */
        const newBookToUpdate = {
            ...currentBookToUpdate[indexToUpdate],
            quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
        }
        /* Use the clice method to remove the book at the specified index, replace with the new object
        and concatenate with the rest of the items in the array */
        let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
        ...currentBookToUpdate.slice(indexToUpdate + 1)]
        return {...state,
            cart:cartUpdate,
            totalAmount: totals(cartUpdate).amount,
            totalQty: totals(cartUpdate).qty
        }
    }
    return state;
}

export function totals(payloadArr){
    const totalAmount = payloadArr.map(function(cartArr){
        return cartArr.price * cartArr.quantity;
    }).reduce(function(a,b){
        return a+b;
    }, 0) // start from 0 index

    const totalQty = payloadArr.map(function(qty){
        return qty.quantity;
    }).reduce(function(a,b){
        return a + b;
    },0)
    return {amount:totalAmount.toFixed(2), qty: totalQty}
}