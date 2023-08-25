import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import Navbar from "./Navbar";
import Oneproduct from "./Oneproduct";
import TackList from "./TackList";
import Cardata from "./Cardata";
import CardModel from "./CardModel";

function App() {
    const [bag, setBag] = useState([]);
    const Shoppingcart = (event, product) => {
        event.stopPropagation();

        const existingProduct = bag.find((item) => item.id === product.id);

        if (existingProduct) {
            const updatedBag = bag.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setBag(updatedBag);
        } else {
            const updatedBag = [...bag, { ...product, quantity: 1 }];
            setBag(updatedBag);
        }
    };

    return (
        <Router >
            {/*<Navbar bag={bag} setBag={setBag} />*/}
            <Routes>
                <Route path="/Product" element={<ProductList bag={bag} setBag={setBag} Shoppingcart={Shoppingcart} />} />
                <Route path="/product/:id" element={<Oneproduct  Shoppingcart={Shoppingcart} bag={bag}/>} />
                <Route path="/tacklist" element={<TackList/>} />
            </Routes>
        </Router>
    );
}

export default App;
