import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function countryCard ({ name, continent, flag, id }) {
    return (
        <div className = 'card'>
            <Link to = {`/home/${id}`}>
                <h3 className = 'c.name'>{name}</h3>
                <img className = 'img-c' src = {flag} alt = 'Imagen no encontrada' />
                <h5 className = 'continent'>{continent}</h5>
            </Link>            
        </div>
    )
}