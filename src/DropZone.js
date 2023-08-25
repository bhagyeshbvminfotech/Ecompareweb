import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'ITEM',
        drop: onDrop,
        collect: monitor => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop}
            style={{
                width: '300px',
                height: '300px',
                border: '2px dashed gray',
                margin: '20px auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isOver ? 'lightgray' : 'white',
            }}
        >
            {isOver ? 'Drop here' : 'Drag items here'}
        </div>
    );
};

export default DropZone;
