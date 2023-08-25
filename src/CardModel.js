import React, { useState } from "react";
import axios from "axios";

function CardModel({ card, setCard, closeModal, data, setData }) {
    const [updatedCard, setUpdatedCard] = useState({
        title: card.title,
        description: card.description,
        userName: card.userName,
        status: card.status,
    });
console.log(updatedCard,"rr");
    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setUpdatedCard((prevCard) => ({
            ...prevCard,
            [name]: value,
        }));
    };

    const handleUpdateClick = () => {
        // Update the card data using setCard
        setCard((prevData) =>
            data.map((column) => ({
                ...column,
                tacks: column.tacks.map((task) =>
                    task.id === card.id ? { ...updatedCard, id: card.id } : task
                ),
            }))
        );

        // Update the data in the original state array
        const newData = data.map((column) => ({
            ...column,
            tacks: column.tacks.map((task) =>
                task.id === card.id ? { ...updatedCard, id: card.id } : task
            ),
        }));
        setData(newData);

        // Update Firebase with the updated card data using Axios
        axios
            .put(`https://tackdata-23032-default-rtdb.firebaseio.com/yourDataPath.json`, newData)
            .then((response) => {
                console.log("Data successfully updated in Firebase:", response.data);
            })
            .catch((error) => {
                console.error("Error updating data in Firebase:", error);
            });

        closeModal(); // Close the modal after updating
    };

    return (
        <div className="modal" style={{ width: "357px" }}>
            <div className="modal-content">
                <span className="close" onClick={closeModal} style={{ fontSize: "30px" }}>
                    &times;
                </span>
                <div className="updatedata">
                <input
                    className="fild"
                    type="text"
                    name="title"
                    value={updatedCard.title}
                    onChange={handleFieldChange}
                    placeholder="Enter Title"
                />
                <input
                    className="fild"
                    type="textarea"
                    name="description"
                    value={updatedCard.description}
                    onChange={handleFieldChange}
                    placeholder="Enter Description"
                />
                <input
                    className="fild"
                    type="text"
                    name="userName"
                    value={updatedCard.userName}
                    onChange={handleFieldChange}
                    placeholder="Enter User Name"
                />
                <button onClick={handleUpdateClick}>Update</button>
                <p>{updatedCard.status}</p>
            </div>
            </div>
        </div>
    );
}

export default CardModel;
