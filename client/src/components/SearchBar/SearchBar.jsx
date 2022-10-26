import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../../redux/actions';
import "./SearchBar.css"

export default function SearchBar ({setCurrentPage}) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function applyCaseName(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e) {
            e.preventDefault();
            try {
                let casedName = applyCaseName(name)
                dispatch(getCountryByName(casedName));
                setName("");
                setCurrentPage(1);
            } catch (e) {
                console.log(e);
                alert('Country not found')
            }
              
    }    

    return (
        <div className = 'searchContainer'>
            <input  
            type = "text" 
            placeholder = "Search country by name" 
            value = {name}
            onChange = { e => handleInputChange(e)}></input>
            <button type = "submit" onClick = {e => handleSubmit(e)}>Search</button>
        </div>
    )
}