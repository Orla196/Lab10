import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Edit component for updating book information
export default function Edit() {
    // Extracting book ID from URL params using React Router's useParams hook
    let { id } = useParams();

    // State variables to manage form input values
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');
    const [author, setAuthor] = useState('');

    // Accessing the navigation function from React Router
    const navigate = useNavigate();

    // useEffect hook to fetch book data when the component mounts
    useEffect(() => {
        axios.get('http://localhost:4000/api/book/' + id)
            .then((response) => {
                // Setting state variables with book data
                setTitle(response.data.title);
                setCover(response.data.cover);
                setAuthor(response.data.author);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    // Function to handle form submission and update book information
    const handleSubmit = (e) => {
        e.preventDefault();

        // Creating a book object with updated information
        const book = {
            title: title,
            cover: cover,
            author: author
        }

        // Sending a PUT request to update the book
        axios.put('http://localhost:4000/api/book/' + id, book)
            .then((res) => {
                // Navigating to the 'read' page after successful update
                navigate('/read');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <h2>Hello from Edit component!</h2>
            {/* Form for editing book information */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Edit Book Title: </label>
                    {/* Input field for editing the book title */}
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Edit Book Cover: </label>
                    {/* Input field for editing the book cover URL */}
                    <input
                        type="text"
                        className="form-control"
                        value={cover}
                        onChange={(e) => { setCover(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Edit Book Author: </label>
                    {/* Input field for editing the book author */}
                    <input
                        type="text"
                        className="form-control"
                        value={author}
                        onChange={(e) => { setAuthor(e.target.value) }}
                    />
                </div>
                <div>
                    {/* Submit button for updating the book */}
                    <input type="submit" value="Edit Book" />
                </div>
            </form>
        </div>
    );
}
