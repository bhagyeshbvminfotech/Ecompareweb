import React, { useState } from "react";
import './Filter.css'
function Filter({onFilterChange,minPrice, maxPrice, onMinPriceChange, onMaxPriceChange}) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleCheckboxChange = (option) => {

        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };


    React.useEffect(() => {
        onFilterChange(selectedOptions);
    }, [selectedOptions, onFilterChange]);

    return (
        <>
            <div className="Category">
                <h3>Category</h3>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedOptions.includes("men's clothing")}
                        onChange={() => handleCheckboxChange("men's clothing")}
                    />
                    Men's clothing
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedOptions.includes("women's clothing")}
                        onChange={() => handleCheckboxChange("women's clothing")}
                    />
                    Women's clothing
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedOptions.includes("jewelery")}
                        onChange={() => handleCheckboxChange("jewelery")}
                    />
                    Jewelry
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedOptions.includes("electronics")}
                        onChange={() => handleCheckboxChange("electronics")}
                    />
                    Electronics
                </label>

                <div className="price-filter" style={{ display: "flex", flexDirection: "column" ,marginTop:'20px'}}>
                    <h3>Price</h3>
                    <label>Min Price:</label>
                    <input
                        type="number"
                        value={isNaN(minPrice) ? '' : minPrice}
                        onChange={(e) => onMinPriceChange(parseFloat(e.target.value))}
                        className="price-input"
                    />
                    <label>Max Price:</label>
                    <input
                        type="number"
                        value={isNaN(maxPrice) ? '' : maxPrice} // Convert NaN to an empty string to prevent the warning
                        onChange={(e) => onMaxPriceChange(parseFloat(e.target.value))}
                        className="price-input"
                    />

                </div>
            </div>
        </>
    );
}

export default Filter;