import React, { useEffect, useState } from "react";
import axios from "axios";
import './Product.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [bag, setBag] = useState([]);
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

    const Shoppingcart=(event,product)=>{
        event.stopPropagation();
        setBag(pr=>[...pr,product])
    };
    console.log(bag)
    return (
        <div className='roots'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="product_div">
                    {products.map((product) => (
                        <li key={product.id} style={{ listStyle: "none" }}>
                            <div
                                className="product-card"
                                onClick={() => handleProductClick(product)}
                            >
                                <img src={product.image} alt={product.title} />
                                <div className="tittile">
                                    <p>{product.title}</p>
                                </div>
                                <div className="two-fild">
                                    <p>${product.price}</p>
                                    <ShoppingCartIcon className="toly" onClick={(event)=>Shoppingcart(event,    product)}/>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductList;
