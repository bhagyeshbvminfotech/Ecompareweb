import React, { useState } from "react";

function Filter({ products,onFilterChange }) {
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
            </div>
            {/*<div className="Price">*/}
            {/*    <h3>Price Range</h3>*/}
            {/*    <label>*/}
            {/*        Min Price:*/}
            {/*        <input*/}
            {/*            type="number"*/}
            {/*            value={minPrice}*/}
            {/*            onChange={(e) => setMinPrice(e.target.value)}*/}
            {/*        />*/}
            {/*    </label>*/}
            {/*    <label>*/}
            {/*        Max Price:*/}
            {/*        <input*/}
            {/*            type="number"*/}
            {/*            value={maxPrice}*/}
            {/*            onChange={(e) => setMaxPrice(e.target.value)}*/}
            {/*        />*/}
            {/*    </label>*/}
            {/*    <button onClick={handleOkButtonClick}>OK</button>*/}
            {/*</div>*/}


        </>
    );
}

export default Filter;