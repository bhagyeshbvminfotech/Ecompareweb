import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ item }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'ITEM',
        item: { id: item.id },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                padding: '8px',
                border: '1px solid gray',
                margin: '4px',
            }}
        >
            {item.name}
        </div>
    );
};

export default DraggableItem;
