import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";
import ScrollButton from "./ScrollButton";
import CheckIcon from '@mui/icons-material/Check';



const ProductList = ({ bag, setBag, Shoppingcart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedOpction, setSelectedOpction] = useState([]);
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const navigate = useNavigate();



    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        navigate(`/product/${product.id}`);
    };

    const handleFilterChange = (selectedOptions) => {
        setSelectedOpction(selectedOptions);
    };

    const isInBag = (productId) => {
        return bag.some(item => item.id === productId);
    };

    const isNumeric = (value) => {
        return !isNaN(parseFloat(value)) && isFinite(value);
    };


    return (
        <div className="roots">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='alldiv'>
                    <Filter products={products}
                            onFilterChange={handleFilterChange}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            onMinPriceChange={(value) => setMinPrice(value)}
                            onMaxPriceChange={(value) => setMaxPrice(value)}/>

                    <ul className="product_div">
                        {products.map((product) => {
                            const showProduct =
                                (selectedOpction.length === 0 || selectedOpction.includes(product.category)) &&
                                ((minPrice === '' || !isNumeric(minPrice)) || product.price >= parseFloat(minPrice)) &&
                                ((maxPrice === '' || !isNumeric(maxPrice)) || product.price <= parseFloat(maxPrice));

                            if (showProduct) {
                                return (
                                    <li key={product.id} style={{ listStyle: "none" }}>
                                        <div className="product-card" onClick={() => handleProductClick(product)}>
                                            <img src={product.image} alt={product.title} />
                                            <div className="tittile">
                                                <p>{product.title}</p>
                                            </div>
                                            <div className="two-fild">
                                                <p>${product.price}</p>
                                                {isInBag(product.id) ? (
                                                    <button className="add-to-bag-button">
                                                        <CheckIcon />
                                                    </button>
                                                ) : (
                                                    <ShoppingCartIcon
                                                        className="toly"
                                                        onClick={(event) => Shoppingcart(event, product)}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </ul>
                </div>
            )}
            <ScrollButton />
        </div>
    );
};

export default ProductList;
