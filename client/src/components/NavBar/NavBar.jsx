import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

export default function NavBar () {
    return (
        <div>
            <Link to = '/home'>
                Home
            </Link>
            <Link to = '/activities'>
                Create Activity
            </Link>
            <Link to = '/about'>
                About
            </Link>
            <SearchBar />
        </div>
    )
}
