import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
// import ProductDetail from "./ProductDetail";
import Navbar from "./Navbar";
import Oneproduct from "./Oneproduct";
function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/Product" element={<ProductList />} />
                <Route path="/product/:id" element={<Oneproduct />} />
            </Routes>
        </Router>
    );
}

export default App;
