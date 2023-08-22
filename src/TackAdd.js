import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import './TackAdd.css'

function TackAdd({data,setData}) {
    const [allTacks,setAllTacks]=useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [tackData, setTackData] = useState({
        title: "",
        description: "",
        userName: "",
        status:"To Do"
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

        setTackData({
            title: "",
            description: "",
            userName: "",
            status:"To Do"
        });
        closeModal();
       console.log(data,"data",allTacks)
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
