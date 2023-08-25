import React, { useEffect, useState } from "react";
import './Filter.css';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonIcon from '@mui/icons-material/Person';
import CheckboxAdd from "./CheckboxAdd";


function Filterbutton({ data, setteacksuser, setSelectedUsername, selectedUsername,card,setCard}) {
    const [usernameOptions, setUsernameOptions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);



    useEffect(() => {
        const allUsernames = data.flatMap(entry => entry.tacks.map(tack => tack.userName));
        const uniqueUsernames = [...new Set(allUsernames)];
        setUsernameOptions(uniqueUsernames);
    }, [data]);

    useEffect(() => {
        const filteredData = data.map(entry => {
            const matchingTacks = entry.tacks.filter(tack => selectedUsername.includes(tack.userName));
            return {
                Dbname: entry.Dbname,
                tacks: matchingTacks
            };
        });
        setteacksuser(filteredData);
    }, [data, selectedUsername]);

    const handleCheckboxChange = (event) => {
        const username = event.target.value;
        if (username === "selectAll") {
            if (event.target.checked) {
                setSelectedUsername(usernameOptions);
            } else {
                setSelectedUsername([]);
            }
        } else {
            setSelectedUsername(prevSelectedUsernames => {
                if (prevSelectedUsernames.includes(username)) {
                    return prevSelectedUsernames.filter(name => name !== username);
                } else {
                    return [...prevSelectedUsernames, username];
                }
            });
        }
    };
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleFilterButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='filter-page'>
        <div className="filter-container">
            <h3 style={{fontfamily: 'revert'}}>Task Mangment</h3>
           <div className="user-filter">
               <PersonIcon/>
            <button className="filter-button" onClick={handleFilterButtonClick}>

                <FilterListIcon className="filter-icon" />
                Filter
            </button>
           </div>
            {isModalOpen && (
                <div className="modall">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <h2>Search Title</h2>
                        <input type="text" className="keyword" placeholder="Enter keywoard.."/>
                    </div>
                    <div className={`dropdown-check-list ${isDropdownOpen ? 'visible' : ''}`}>
                        <span className="anchor" onClick={handleDropdownToggle}>Select User</span>
                        <ul className="items">
                            <li key="selectAll">
                                <input
                                    type="checkbox"
                                    value="selectAll"
                                    onChange={handleCheckboxChange}
                                    checked={selectedUsername.length === usernameOptions.length}
                                />
                                Select All
                            </li>
                            {usernameOptions.map((name, index) => (
                                <li key={index}>
                                    <input
                                        type="checkbox"
                                        value={name}
                                        onChange={handleCheckboxChange}
                                        checked={selectedUsername.includes(name)}
                                    />
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <CheckboxAdd/>
                </div>

            )}

        </div>
        </div>
    );
}

export default Filterbutton;
