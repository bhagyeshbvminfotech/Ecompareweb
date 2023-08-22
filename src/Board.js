import React, {useEffect, useState} from "react";
import All from "./Bord";
import "./Bord.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TackAdd from "./TackAdd";
import CardModel from "./CardModel";
import Filterbutton from "./Filterbutton";

function Board() {
    const [data, setData] = useState(All);
    const [card, setCard] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [teacksuser, setteacksuser] = useState([]);
    const [selectedUsername, setSelectedUsername] = useState("");
console.log(selectedUsername.length)

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };


    const handleDragEnd = (result) => {
        if (!result.destination) {
            console.log(result);
            return;
        }

        const { source, destination } = result;
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const sourceColumnIndex = data.findIndex(
            (column) => column.Dbname === source.droppableId
        );
        const destinationColumnIndex = data.findIndex(
            (column) => column.Dbname === destination.droppableId
        );

        const sourceColumn = data[sourceColumnIndex];
        const destinationColumn = data[destinationColumnIndex];

        const task = sourceColumn.tacks[source.index];

        sourceColumn.tacks.splice(source.index, 1);
        destinationColumn.tacks.splice(destination.index, 0, task);

        task.status = destination.droppableId;
        console.log(destination.droppableId)

        setData([...data]);
    };

    const openCard = (task) =>{
        console.log("Opening card:", task);
        setCard(task);
        openModal()
    };


    return (
        <div>
            <Filterbutton
                data={data}
                teacksuser={teacksuser}
                setteacksuser={setteacksuser}
                selectedUsername={selectedUsername}
                setSelectedUsername={setSelectedUsername}
            />
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="board-container">
                    {selectedUsername.length <= 0   ? (
                        data.map((column) => (
                            <div key={column.Dbname} className="column">
                                <h2 className='dbname'>{column.Dbname}</h2>
                                <Droppable droppableId={column.Dbname} key={column.Dbname}>
                                    {(provided) => (
                                        <div
                                            className="task-list"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {column.tacks.map((task, index) => (
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
                            <div key={column.Dbname}  className="column">
                                <h2 className='dbname'>{column.Dbname}</h2>
                                <Droppable droppableId={column.Dbname} key={column.Dbname}>
                                    {(provided) => (
                                        <div
                                            className="task-list"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {column.tacks.map((task, index) => (
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
            {isOpen && <CardModel card={card} setCard={setCard} closeModal={closeModal} />}
        </div>
    );
}

export default Board;
