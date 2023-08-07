import React, {useState} from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import './Nabr.css';
import Cart from "./Cart";
import Modal from "react-modal";

function Navbar({bag,setBag}) {
    return (
        <nav className="navbar">
            <div className="search-bar">
                <input type="text" placeholder="Search Product" />
                <SearchIcon />
            </div>
            <div className="user-icon">
                <AccountCircleIcon />
                <div className="cart-wrapper">
                    <span className="cart-item-count">{bag.length}</span>
                    <Cart bag={bag} setBag={setBag} />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
