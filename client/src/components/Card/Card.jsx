import React from 'react';

export default function countryCard ({ name, continent, flag }) {
    return (
        <div>
            <h3>{name}</h3>
            <img src = {flag} alt = 'Imagen no encontrada' />
            <h5>{continent}</h5>
        </div>
    )
}