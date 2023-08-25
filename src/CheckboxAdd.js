import React, { useState } from "react";
import './ADDdata.css';

function CheckboxAdd() {
    const [inputValue, setInputValue] = useState("");
    const [listData, setListData] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);

    const listDataHandle = () => {
        if (inputValue.trim() !== "") {
            setListData([...listData, { text: inputValue, checked: false }]);
            setInputValue("");
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleCheckboxChange = (index) => {
        const updatedList = [...listData];
        updatedList[index].checked = !updatedList[index].checked;
        setListData(updatedList);

        if (updatedList[index].checked) {
            setCheckedItems([...checkedItems, index]);
        } else {
            const updatedCheckedItems = checkedItems.filter(itemIndex => itemIndex !== index);
            setCheckedItems(updatedCheckedItems);
        }
    };

    console.log(listData);
    console.log(checkedItems);

    return (
        <div>
            <input
                className="ADDdata"
                type="text"
                placeholder="Add to Checklist"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={listDataHandle}>Add</button>
            <ul style={{ listStyle: 'none'}}>
                {listData.map((item, index) => (
                    <li key={index} style={{fontSize:'20px'}}>
                        <label className={item.checked ? "checked" : ""}>
                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            {item.text}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CheckboxAdd;
