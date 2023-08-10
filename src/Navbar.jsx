import React, {useEffect, useState} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from "@mui/icons-material/Search";

import './Nabr.css';
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Navbar({bag,setBag}) {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    console.log(filteredProducts);

    // useEffect(() => {
    //     const filtered = products.filter((product) =>
    //         product.title.toLowerCase().includes(searchQuery.toLowerCase())
    //     );
    //     setFilteredProducts(filtered);
    // }, [searchQuery, products]);

    useEffect(() => {
        const filtered = searchQuery
            ? products.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            : [];

        setFilteredProducts(filtered);
    }, [searchQuery, products]);



    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`);
    };

    return (
        <>
        <nav className="navbar">
            <a style={{color:"white"}}>React Shop</a>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search Product"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIcon style={{color:"white"}}/>
            </div>
            <div className="user-icon">
                <AccountCircleIcon  style={{color:"white"}}/>
                <div className="cart-wrapper">
                    <span className="cart-item-count">{bag.length}</span>
                    <Cart bag={bag} setBag={setBag} />
                </div>
            </div>
        </nav>
    {filteredProducts.length > 0 &&
    <div className="product-list" >
        {filteredProducts.map((product) => (
            <div key={product.id} className="product" style={{display:'flex'}} onClick={() => handleProductClick(product)}>
                <div>
                    <img style={{ width: '60px'}} src={product.image} alt={product.title}  />
                </div>
                <div className='title-price'>
                    <a>{product.title}</a>
                    <a style={{fontSize:'20px'}}>$:{product.price}</a>
                </div>

            </div>
        ))}
    </div>
    }
    </>
    )
}

export default Navbar;
