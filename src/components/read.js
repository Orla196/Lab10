import { useEffect, useState } from "react";
import axios from "axios";
import Books from "./books";

// Read component for fetching and displaying a list of books
function Read() {
    // State variable to store the fetched book data
    const [data, setData] = useState([]);

    // useEffect hook to fetch books from the server when the component mounts
    useEffect(() => {
        axios.get('http://localhost:4000/api/books')
            .then((response) => {
                // Setting the state variable with the fetched book data
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Function to reload and fetch the latest book data
    const ReloadData = (e) => {
        axios.get('http://localhost:4000/api/books')
            .then((response) => {
                // Updating the state variable with the latest book data
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <h2>Hello from Read Component!</h2>
            {/* Passing the fetched book data and the ReloadData function to the Books component */}
            <Books myBooks={data} Reload={ReloadData}></Books>
        </div>
    );
}

export default Read;
