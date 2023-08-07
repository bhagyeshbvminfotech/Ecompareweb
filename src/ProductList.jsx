import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";
import ScrollButton from "./ScrollButton";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const ProductList = ({ bag, setBag, Shoppingcart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedOpction, setSelectedOpction] = useState([]);

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


    return (
        <div className="roots">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Filter products={products} onFilterChange={handleFilterChange} />
                    <ul className="product_div">
                        {products.map((product) => {
                            const showProduct = selectedOpction.length === 0 || selectedOpction.includes(product.category);

                            return showProduct ? (
                                <li key={product.id} style={{ listStyle: "none" }}>
                                    <div className="product-card" onClick={() => handleProductClick(product)}>
                                        <img src={product.image} alt={product.title} />
                                        <div className="tittile">
                                            <p>{product.title}</p>
                                        </div>
                                        <div className="two-fild">
                                            <p>${product.price}</p>
                                            {isInBag(product.id) ? (
                                                <RemoveShoppingCartIcon/>
                                            ) : (
                                                <ShoppingCartIcon
                                                    className="toly"
                                                    onClick={(event) => Shoppingcart(event, product)}
                                                />
                                            )}

                                        </div>
                                    </div>
                                </li>
                            ) : null;
                        })}
                    </ul>
                </>
            )}
            <ScrollButton />
        </div>
    );
};

export default ProductList;
