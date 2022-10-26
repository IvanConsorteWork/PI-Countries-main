import React from 'react';
import './Pagination.css';

export default function pagination ({ allCountries, countriesPerPage, pagination  }) {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <nav>
            <ul className = 'paginationBar'>
                {pageNumber && 
                pageNumber.map(number => {
                    return (
                        <li className = 'paginationNumber' key = {number}>
                        <button onClick={() => pagination(number)}>
                        {number}
                        </button>
                        </li>
                    )                   
                }) 
                }
            </ul>
        </nav>
    )
}