import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActivities, getAllCountries, filterByActivity, filterByContinent, sortByName, sortByPopulation } from '../../redux/actions';
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Home.module.css';

export default function Home () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllActivities());
        dispatch(getAllCountries())
    }, [dispatch])

    const allActivities = useSelector((state) => state.activities);
    const allCountries = useSelector((state) => state.allCountries);
    const countries = useSelector((state) => state.countries);

    const [sortName, setSortName] = useState("");
    const [sortPopulation, setSortPopulation] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    let currentCountries
    let totalPages = Math.ceil(countries.length / 10) + 1;

    if (currentPage === 1) {
        currentCountries = countries.slice(0, 9);
      } else {
        currentCountries = countries.slice(
          (currentPage - 1) * 10 - 1, 
          (currentPage - 1) * 10 + 9
        );
      }

    if (countries.length < allCountries.length) {
        totalPages = Math.ceil(countries.length / 10);
      }

    const paginate = (number) => {
        setCurrentPage(currentPage + number);
    };

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
        <div className = {styles.HomeContainer}>
            <div className = {styles.gridContainer}>

                <NavBar className = {styles.navBar} />

                <SearchBar className = {styles.searchBar} setCurrentPage = {setCurrentPage}/>

                <h1 className = {styles.appTitle}>
                    Countries Henry App
                </h1>

                <div className = {styles.filters}>
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

                <div className = {styles.pagination}>
                    <Pagination
                        totalPages={totalPages}
                        paginate={paginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                <div className={styles.cardsContent}>
                    <div className = {styles.cardsGrid}>
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

                <div className = {styles.refreshButtonDiv}>
                    <button className = {styles.refreshButton} onClick = {e => {handleClick(e)}}>
                        Refresh Countries List
                    </button>
                </div>
            </div>
        </div>
    )
}
