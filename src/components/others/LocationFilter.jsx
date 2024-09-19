import React, { useState, useEffect } from 'react';
import './LocationFilter.css';

const SuburbAutocomplete = ({ suburbs, getProducts, selectedSuburb }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredSuburbs, setFilteredSuburbs] = useState([]);

    useEffect(() => {
        if (selectedSuburb && selectedSuburb.suburb) {
            setInputValue(selectedSuburb.suburb);
        } else if (selectedSuburb === '') {
            setInputValue('');
        }
    }, [selectedSuburb.suburb, selectedSuburb]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.length >= 3) {
            const filtered = suburbs["VIC"].filter(suburb =>
                suburb.suburb.toLowerCase().includes(value.toLowerCase()) ||
                suburb.postcode.toString().includes(value)
            );
            setFilteredSuburbs(filtered);
        } else {
            setFilteredSuburbs([]);
        }
    };

    const handleSuggestionClick = (suburb) => {
        setInputValue(`${suburb.suburb} - ${suburb.postcode}`);
        setFilteredSuburbs([]);
        getProducts(1, '', '', '', suburb);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (inputValue === '') {
                getProducts(1, '', '', '', 'clear');
            } else if (!filteredSuburbs.some(suburb => `${suburb.suburb} - ${suburb.postcode}` === inputValue)) {
                alert('Please select a suburb from the dropdown.');
            }
        }
    };

    return (
        <div className="autocomplete">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter a suburb or postal code"
                className="form-control mw-180"
            />
            {filteredSuburbs.length > 0 && (
                <ul className="suggestions">
                    {filteredSuburbs.map((suburb, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suburb)}>
                            {suburb.suburb} - {suburb.postcode}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SuburbAutocomplete;
