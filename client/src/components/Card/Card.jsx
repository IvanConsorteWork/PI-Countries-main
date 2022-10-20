import React from 'react';
import { Link } from 'react-router-dom';

export default function countryCard ({ name, continent, flag, id }) {
    return (
        <div>
            <Link to = {`/home/${id}`}>
                <h3>{name}</h3>
                <img src = {flag} alt = 'Imagen no encontrada' />
                <h5>{continent}</h5>
            </Link>            
        </div>
    )
}