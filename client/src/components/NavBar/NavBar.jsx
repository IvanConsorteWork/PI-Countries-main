import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar () {
    return (
        <div className = 'navContainer'>
            
            <Link to = '/home' className={styles.navButton}>
                Home
            </Link>            
            
            <Link to = '/activities' className={styles.navButton}>
                Create Activity
            </Link>            
           
            <Link to = '/about' className={styles.navButton}>
                About
            </Link>            
            
        </div>
    )
}
