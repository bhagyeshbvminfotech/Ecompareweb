import React, { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Modal from 'react-modal';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import './Cart.css'

Modal.setAppElement('#root');

function Cart({ bag, setBag }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantities, setQuantities] = useState({});

    const orderTotal = bag.reduce((total, item, index) => {
        const quantity = quantities[index] || 1;
        return total + item.price * quantity;
    }, 0);


    function prouctstore() {

        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function handleDeleteItem(index) {
        console.log("Deleted item at index:", index);
        const updatedBag = [...bag];
        updatedBag.splice(index, 1);
        setBag(updatedBag);
    }

    function handleQuantityChange(index, newQuantity) {
        setQuantities({ ...quantities, [index]: newQuantity });
    }

    return (
        <>
            <ShoppingCartIcon onClick={prouctstore} />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        background: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        maxWidth: '70%',
                        height: '30%',
                        margin: 'auto',
                        background: 'white',
                        borderRadius: '8px',
                        padding: '20px',
                    }
                }}
            >
                <div className='model'>
                    <h2>Shopping Bag</h2>
                    <CloseIcon onClick={closeModal}>Close Modal</CloseIcon>
                </div>

                {bag && bag.map((item, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'nowrap'
                        }}>
                            <div style={{ display: 'flex' }}>
                                <img className='imgall' src={item.image} alt={item.title} />
                                <strong>{item.title}</strong>
                            </div>
                            <DeleteIcon style={{ color: 'red' }} onClick={() => handleDeleteItem(index)}>Delete</DeleteIcon>
                        </div>
                        <div className='totaldiv'>
                            <div>
                                Price: ${item.price}
                            </div>
                            <div className='count'>
                                <button onClick={() => handleQuantityChange(index, (quantities[index] || 1) - 1)}>-</button>
                                <span>{quantities[index] || 1}</span>
                                <button onClick={() => handleQuantityChange(index, (quantities[index] || 1) + 1)}>+</button>
                            </div>
                            <div>
                                Total: ${(item.price * (quantities[index] || 1)).toFixed(2)}
                            </div>
                        </div>

                    </div>

                ))}
                {bag.length === 0 && <div>Your shopping bag is empty.</div>}
                <div className='order-total'>

                    Order total: ${orderTotal.toFixed(2)}
                </div>

            </Modal>

        </>
    );
}

export default Cart;
