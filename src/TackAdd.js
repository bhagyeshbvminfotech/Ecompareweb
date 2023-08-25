import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import './TackAdd.css';
import axios from "axios";

function TackAdd({ data, setData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [tackData, setTackData] = useState({
        title: "",
        description: "",
        userName: "",
        status: "To Do"
    });

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTackData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addTack = () => {
        const newTack = {
            id: uuidv4(),
            ...tackData,
        };

        const updatedData = data.map((column) => {
            if (column.Dbname === tackData.status) {
                return {
                    ...column,
                    tacks: [...column.tacks, newTack],
                };
            }
            return column;
        });

        setData(updatedData);
console.log(data,"..........",updatedData)
        // Update Firebase with the new tack data using Axios
        axios.put('https://tackdata-23032-default-rtdb.firebaseio.com/yourDataPath.json', updatedData)
            .then(response => {
                console.log('Data successfully updated in Firebase:', response.data);
            })
            .catch(error => {
                console.error('Error updating data in Firebase:', error);
            });

        setTackData({
            title: "",
            description: "",
            userName: "",
            status: "To Do"
        });
        closeModal();
        console.log(data, "data");
    };

    return (
        <div className="tack-add-container">
            <button className="add-button" onClick={openModal}>Add Task</button>
            {isOpen && (
                <div className="modal">
                    <div className="input-group">
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter Title"
                            value={tackData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="description"
                            placeholder="Enter Description"
                            value={tackData.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="userName"
                            placeholder="Enter User Name"
                            value={tackData.userName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="save-button" onClick={addTack}>Save Tack</button>
                    <button className="cancel-button" onClick={closeModal}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default TackAdd;
