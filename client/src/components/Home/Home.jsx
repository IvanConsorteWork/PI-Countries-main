import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActivities, getAllCountries, filterByActivity, filterByContinent, sortByName, sortByPopulation } from '../../redux/actions';
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import './Home.css'

export default function Home () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllActivities());
        dispatch(getAllCountries())
    }, [dispatch])

    const allActivities = useSelector((state) => state.activities);
    const allCountries = useSelector((state) => state.countries);

    const [sortName, setSortName] = useState("");
    const [sortPopulation, setSortPopulation] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(9);

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const pagination = (pageNumber) => {
        if (pageNumber === 1) {
            setCountriesPerPage(9);
            setCurrentPage(pageNumber)
        } else if (pageNumber > 25) {
            setCountriesPerPage(10);
            setCurrentPage(25)
        } else {
            setCountriesPerPage(10);
            setCurrentPage(pageNumber)
        }
    }

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllCountries());
    }

    function handlePaginationClick(e) {
        let aux = currentPage;
        if (e.target.id === "previous" && currentPage !== 1) {
            setCurrentPage(--aux)
        } else if (e.target.id === "next" && currentPage < 25 && currentCountries.length >= 9) {
            setCurrentPage(++aux)
        }
    }

    function handleFilterByActivity (e) {
        dispatch(filterByActivity(e.target.value));
        setCurrentPage(1)
    }

    function handleFilterByContinent (e) {
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1)
    }

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        setSortName(`Sort ${e.target.value}`);
    }

    function handleSortByPopulation(e) {
        e.preventDefault();
        dispatch(sortByPopulation(e.target.value));
        setCurrentPage(1);
        setSortPopulation(`Sort ${e.target.value}`);
    }

    return (
        <div className = "HomeContainer">
            <div className = "grid-container">

                <NavBar className = "navBar" />

                <SearchBar className = "searchBar" setCurrentPage = {setCurrentPage}/>

                <h1 className = "appTitle">
                    Countries Henry App
                </h1>

                <div className = "filters">
                    <select onChange = {e => handleFilterByActivity(e)}>
                        <option key = "all" value = "all">Select Activity</option>
                        {allActivities?.map((a) => {
                            return (
                                <option key={a.name} value = {a.name}>{a.name}</option>
                            )
                        })}
                    </select>

                    <select onChange = {e => handleFilterByContinent(e)} >
                        <option value = "All">Select Continent</option>
                        <option value = "Asia">Asia</option>
                        <option value = "South America">South America</option>
                        <option value = "North America">North America</option>
                        <option value = "Europe">Europe</option>
                        <option value = "Oceania">Oceania</option>
                        <option value = "Antarctica">Antarctica</option>
                        <option value = "Africa">Africa</option>
                    </select>

                    <select defaultValue = {"default"} onChange={(e) => handleSortByName(e)}>
                        <option value="default" disabled> Sort by Name </option>
                        <option value="asc">A-Z</option>
                        <option value="des">Z-A</option>
                    </select>

                    <select defaultValue={"default"} onChange={(e) => handleSortByPopulation(e)}>
                        <option value="default" disabled>Sort by Population</option>
                        <option value="des">Higher Population</option>
                        <option value="asc">Lower Population</option>
                    </select>

                </div>

                <div className = 'pagination'>
                    <button className = 'previousNext' id = "previous" onClick = {e => {handlePaginationClick(e)}}>Previous</button>
                    <Pagination
                        allCountries = {allCountries.length}
                        currentPage = {currentPage}
                        countriesPerPage = {countriesPerPage}
                        setCurrentPage = {setCurrentPage}
                        pagination = {pagination}
                    />
                    <button className = 'previousNext' id = "next" onClick = {e => {handlePaginationClick(e)}}>Next</button>
                </div>

                <div className='cards-content'>
                    <div className = 'cards-grid'>
                        {currentCountries && currentCountries?.map((c) => {
                            return (
                                <Card
                                id = {c.id}
                                key = {c.id}
                                name = {c.name}
                                flag = {c.flag}
                                continent = {c.continent}/>
                            )
                        })
                        }
                    </div>
                </div>

                <div className = 'refreshButtonDiv'>
                    <button className = "refreshButton" onClick = {e => {handleClick(e)}}>
                        Refresh Countries List
                    </button>
                </div>
            </div>
        </div>
    )

}
