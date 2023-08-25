// import React, { useEffect, useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import axios from "axios";
//
// function Search({filteredProducts, setFilteredProducts}) {
//     const [products, setProducts] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//
//
//     useEffect(() => {
//         fetchProducts();
//     }, []);
//
//     console.log(filteredProducts);
//
//     // useEffect(() => {
//     //     const filtered = products.filter((product) =>
//     //         product.title.toLowerCase().includes(searchQuery.toLowerCase())
//     //     );
//     //     setFilteredProducts(filtered);
//     // }, [searchQuery, products]);
//
//     useEffect(() => {
//         const filtered = searchQuery
//             ? products.filter((product) =>
//                 product.title.toLowerCase().includes(searchQuery.toLowerCase())
//             )
//             : [];
//
//         setFilteredProducts(filtered);
//     }, [searchQuery, products]);
//
//
//
//     const fetchProducts = async () => {
//         try {
//             const response = await axios.get("https://fakestoreapi.com/products");
//             setProducts(response.data);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };
//
//     return (
//         <>
//             <div className="search-bar">
//                 <input
//                     type="text"
//                     placeholder="Search Product"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <SearchIcon style={{color:"white"}}/>
//             </div>
//         </>
//     );
// }
//
// export default Search;
