import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCountries } from '../../redux/actions';
import SearchBar from '../SearchBar/SearchBar';

export default function NavBar () {
    const dispatch = useDispatch();

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllCountries());
    }

    return (
        <div>
            <Link to = '/home'>
                Home
            </Link>
            <Link to = '/activities'>
                Create Activity
            </Link>
            <button onClick = {e => {handleClick(e)}}>
                Refresh Countries List
            </button>
            <Link to = '/about'>
                About
            </Link>
            <SearchBar />
        </div>
    )
}
