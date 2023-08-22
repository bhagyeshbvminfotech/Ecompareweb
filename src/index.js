import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DragDropContext } from 'react-beautiful-dnd';



ReactDOM.render(
    <React.StrictMode>
        <DragDropContext >
            <App />
        </DragDropContext>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
