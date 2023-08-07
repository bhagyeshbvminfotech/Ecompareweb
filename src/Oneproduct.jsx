import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams ,useNavigate } from "react-router-dom";
import "./Oneproduct.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from "@mui/material/SvgIcon/SvgIcon";

function Oneproduct({Shoppingcart}) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [categoryData, setCategoryData] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(
                `https://fakestoreapi.com/products/${id}`
            );
            setProduct(response.data);
            if (response.data && response.data.category) {
                categoryget(response.data.category);
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    const categoryget = async (category) => {
        try {
            const response = await axios.get(
                `https://fakestoreapi.com/products/category/${category}`
            );

            const idAsNumber = parseInt(id, 10);
            console.log(idAsNumber)

            const filteredData = response.data.filter((item) => item.id !== idAsNumber);

            setCategoryData(filteredData);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };


    const roundedRating = Math.round(product?.rating?.rate * 10) / 10;
    const renderRatingStars = (rating, starColor) => {
        const maxRating = 5;
        const fullStars = Math.floor(rating);
        const isHalfStar = rating % 1 >= 0.5;

        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} style={{ color: '#eab308' }}>&#9733;</span>);
        }

        if (isHalfStar) {
            stars.push(<span key="halfStar" style={{ color: '#eab308' }}>&#9733;</span>);
        }

        for (let i = stars.length; i < maxRating; i++) {
            stars.push(<span key={i}>&#9734;</span>);
        }

        return stars;
    };

    const handleProductClick = (item) => {
        navigate(`/product/${item.id}`);
    };



    return (
        <div className="product-details">
            {product ? (
                <div className='div-product'>
                    <div >
                        <img className="product-image" src={product.image} alt={product.title} />
                    </div>
                    <div className='product-detailsll'>
                    <p className="product-title">{product.title}</p>
                    <p className="product-price">${product.price}</p>
                    <div className="product-rating">
                        <p>{product.rating.rate}{renderRatingStars(roundedRating)}</p>
                        <p>{product.rating.count} reviews</p>
                    </div>
                    <p className="product-description">{product.description}</p>

                            <button className="add-to-bag-button" onClick={(event)=>Shoppingcart(event,product)}>
                                Add to bag
                                <ShoppingCartIcon className="cart-icon" />
                            </button>

                    </div>
                </div>
            ) : (
                <p>Loading product details...</p>
            )}

            <div>
            {categoryData.length > 0 && (
                <div className="category-data">
                    <h2 style={{ borderBottom: '2px solid black' }}>You may also be interested</h2>
                    <div className='product-category-w'>
                    <a className='uldata'>
                        {categoryData.map((item) => (
                            <div className='product-category' key={item.id}
                                 onClick={() => handleProductClick(item)}
                            >
                                <img className='catogeryimag' src={item.image}/>
                                <div >
                                <p>{item.title}</p>
                                <p>${item.price}</p>
                                </div>
                            </div>
                        ))}
                    </a>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}

export default Oneproduct;
