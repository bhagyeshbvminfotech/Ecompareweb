import React, { useState } from "react";
import axios from "axios";

function Cardata() {
    const [carname, setCarname] = useState("");
    const [carcompany, setCarCompany] = useState("");
    const [carcolor, setCarColor] = useState("");
    const [carprice, setCarPrice] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        const carData = {
            carename: carname,
            carcompany: carcompany,
            carcolor: carcolor,
            carprice: carprice
        };

        // Replace with your Firebase database URL
        const firebaseUrl = "https://cllge-9b329-default-rtdb.firebaseio.com/.json";

        // Use Axios to send a POST request to Firebase
        axios.post(firebaseUrl, carData)
            .then(response => {
                console.log("Car data successfully added:", response);
                // Clear the input fields
                setCarname("");
                setCarCompany("");
                setCarColor("");
                setCarPrice("");
            })
            .catch(error => {
                console.error("Error adding car data:", error);
            });
    };

    return (
        <div>
            <h1>Add Car Data</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Car Name:
                    <input type="text" value={carname} onChange={e => setCarname(e.target.value)} />
                </label>
                <br />
                <label>
                    Car Company:
                    <input type="text" value={carcompany} onChange={e => setCarCompany(e.target.value)} />
                </label>
                <br />
                <label>
                    Car Color:
                    <input type="text" value={carcolor} onChange={e => setCarColor(e.target.value)} />
                </label>
                <br />
                <label>
                    Car Price:
                    <input type="text" value={carprice} onChange={e => setCarPrice(e.target.value)} />
                </label>
                <br />
                <button type="submit">Add Car</button>
            </form>
        </div>
    );
}

export default Cardata;
