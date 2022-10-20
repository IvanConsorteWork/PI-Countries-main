import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries, filterByActivity, filterByContinent, sortByName, sortByPopulation } from '../../redux/actions';
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination';
import NavBar from '../NavBar/NavBar';

export default function Home () {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);

    const [sortName, setSortName] = useState("");
    const [sortPopulation, setSortPopulation] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(9);

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);
    
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
        <div>            
            <NavBar />            
            <h1>
                Countries Henry App
            </h1>
            <div>
                <select onChange = {e => handleFilterByActivity(e)}>
                    <option value = "all">Activities</option>
                    <option value = "act">With Activities</option>
                    <option value = "noAct">Without Activities</option>
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

                <Pagination 
                    allCountries = {allCountries.length}
                    countriesPerPage = {countriesPerPage}
                    pagination = {pagination}
                />

                {currentCountries && currentCountries?.map((c) => {
                    return (
                        <Card 
                        id = {c.id}
                        name = {c.name} 
                        flag = {c.flag} 
                        continent = {c.continent}/>
                    )                    
                })
                }            
            </div>
            <button onClick = {e => {handleClick(e)}}>
                Refresh Countries List
            </button>
        </div>
    )

}
