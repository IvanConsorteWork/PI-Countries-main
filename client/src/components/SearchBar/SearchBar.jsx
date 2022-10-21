import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../../redux/actions';

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e) {
            e.preventDefault();  
            let casedName = applyCaseName(name)
            dispatch(getCountryByName(casedName));
            setName("")    
    }

    function applyCaseName(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <div>
            <input 
            type = "text" 
            placeholder = "Search country by name" 
            value = {name}
            onChange = { e => handleInputChange(e)}></input>
            <button type = "submit" onClick = {e => handleSubmit(e)}>Search</button>
        </div>
    )
}