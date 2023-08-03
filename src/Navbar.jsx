import React from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import './Nabr.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="search-bar">
                <input type="text" placeholder="Search Product" />
                <SearchIcon />
            </div>
            <div className="user-icon">
                <AccountCircleIcon />
                <ShoppingCartIcon className='allshpoingestorelcon'/>
            </div>
        </nav>
    )
}

export default Navbar;
