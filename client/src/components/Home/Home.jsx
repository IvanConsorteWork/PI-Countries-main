import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries, filterByContinent } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination';

export default function Home () {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(9);

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
    
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getAllCountries())
    }, [dispatch]) //Equivale a componentDidMount

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllCountries());
    }

    function handleFilterByContinent (e) {
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1)
    }

    return (
        <div>
            <Link to = '/activities'>
                Create Activity
            </Link>
            <h1>
                Countries Henry App
            </h1>
            <button onClick = {e => {handleClick(e)}}>
                Refresh Countries List
            </button>
            <div>
                {/* <select>
                    <option value = 'Continent'>Filter by continent</option>
                    <option value = 'Activities'>Filter by touristic activity</option>
                </select>
                <select>
                    <option value = 'Alphabet'>Sort by alphabetic order</option>
                    <option value = 'Population'>Sort by population quantity</option>
                </select>
                <select>
                    <option value = 'asc'>Ascending order</option>
                    <option value = 'desc'>Descending order</option>
                </select> */}

            <select onChange={e => handleFilterByContinent(e)} >
                <option value="All">Continent</option>
                <option value="Asia">Asia</option>
                <option value="South America">South America</option>
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Africa">Africa</option>
            </select>

                <Pagination 
                    allCountries = {allCountries.length}
                    countriesPerPage = {countriesPerPage}
                    pagination = {pagination}
                />

                {currentCountries && currentCountries?.map((c) => {
                    return (
                        <Card 
                        name = {c.name} 
                        flag = {c.flag} 
                        continent = {c.continent}/>
                    )                    
                })
                }
            </div>
        </div>
    )

}
