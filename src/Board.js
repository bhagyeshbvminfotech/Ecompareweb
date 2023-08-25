import React, { useEffect, useState } from "react";
import "./Bord.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TackAdd from "./TackAdd";
import CardModel from "./CardModel";
import Filterbutton from "./Filterbutton";
import axios from "axios";
import All from "./Bord";

function Board() {
    const [data, setData] = useState([]);
    const [card, setCard] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [teacksuser, setTeacksuser] = useState([]);
    const [selectedUsername, setSelectedUsername] = useState("");

    useEffect(() => {
        axios
            .get("https://tackdata-23032-default-rtdb.firebaseio.com/yourDataPath.json")
            .then((response) => {
               setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data from Firebase:", error);
            });
    }, []);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const { source, destination } = result;
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const newData = [...data];
        const sourceColumnIndex = newData.findIndex(
            (column) => column.Dbname === source.droppableId
        );
        const destinationColumnIndex = newData.findIndex(
            (column) => column.Dbname === destination.droppableId
        );

        const sourceColumn = newData[sourceColumnIndex];
        const destinationColumn = newData[destinationColumnIndex];

        const task = sourceColumn.tacks[source.index];

        sourceColumn.tacks.splice(source.index, 1);
        destinationColumn.tacks.splice(destination.index, 0, task);

        task.status = destination.droppableId;

        setData(newData);

        // Update Firebase with the new data using Axios
        axios.put('https://tackdata-23032-default-rtdb.firebaseio.com/yourDataPath.json', newData)
            .then(response => {
                console.log('Data successfully updated in Firebase:', response.data);
            })
            .catch(error => {
                console.error('Error updating data in Firebase:', error);
            });
    };

    const openCard = (task) => {
        console.log("Opening card:", task);
        setCard(task);
        openModal();
    };

    return (
        <div>
            <Filterbutton
                card={card} setCard={setCard}
                data={data}
                teacksuser={teacksuser}
                setteacksuser={setTeacksuser}
                selectedUsername={selectedUsername}
                setSelectedUsername={setSelectedUsername}
            />
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="board-container">
                    {selectedUsername.length <= 0 ? (
                        data.map((column) => (
                            <div key={column.Dbname} className="column">
                                <h2 className="dbname">{column.Dbname}</h2>
                                <Droppable droppableId={column.Dbname} key={column.Dbname}>
                                    {(provided) => (
                                        <div
                                            className="task-list"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {column.tacks && column.tacks.map((task, index) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id.toString()}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            className="task-card"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            onClick={() => openCard(task)}
                                                        >
                                                            <div>
                                                                <a>{task.title}</a>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))
                    ) : (
                        teacksuser.map((column) => (
                            <div key={column.Dbname} className="column">
                                <h2 className="dbname">{column.Dbname}</h2>
                                <Droppable droppableId={column.Dbname} key={column.Dbname}>
                                    {(provided) => (
                                        <div
                                            className="task-list"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {column.tacks && column.tacks.map((task, index) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id.toString()}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            className="task-card"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            onClick={() => openCard(task)}
                                                        >
                                                            <div>
                                                                <a>{task.title}</a>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))
                    )}
                </div>
            </DragDropContext>
            <TackAdd data={data} setData={setData} />
            {isOpen && <CardModel card={card} setCard={setCard} closeModal={closeModal} data={data} setData={setData}/>}
        </div>
    );
}

export default Board;
