import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

export default function NavBar () {
    return (
        <div className = 'navContainer'>
            
            <Link to = '/home' className='navButton'>
                Home
            </Link>            
            
            <Link to = '/activities' className='navButton'>
                Create Activity
            </Link>            
           
            <Link to = '/about' className='navButton'>
                About
            </Link>            
            
        </div>
    )
}
