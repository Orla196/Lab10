import React from 'react';
import BookItem from "./bookItem";

// Functional component for rendering a list of books
function Books(props) {
    return (
        // Mapping over the array of books and rendering BookItem component for each book
        props.myBooks.map((book) => (
            <BookItem myBook={book} key={book._id} reload={()=>{props.Reload()}}></BookItem>
        ))
    );
}

// Exporting the Books component
export default Books;