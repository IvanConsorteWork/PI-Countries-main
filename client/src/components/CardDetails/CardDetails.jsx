import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetails } from '../../redux/actions';
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import styles from './CardDetails.module.css';

export default function CardDetails (props) {
    const dispatch = useDispatch();

    const history = useHistory();

    const myCountry = useSelector((state) => state.countryDetail);

    const [countryLoad, setCountryLoad] = useState(true);    

    useEffect(() => {
        const chargeCountry = async() => {   
            await dispatch(getCountryDetails(props.match.params.id)) 
            setCountryLoad(false)   
            };
        chargeCountry() 
    }, [dispatch, props.match.params.id]);

    function checkActivities () {
        try {
            if (myCountry.activities.length) {
                return (
                    <h3><b>Activities: </b></h3>
                )
            } else {
                return ""
            }
        } catch (e) {
            alert('Country not Found');
            history.push('/404')
        }
    }

    return (
        <div className = {styles.cardDetailsGrid}>
            <div className = {styles.navBarDetails}>
                <NavBar />
            </div>
            <div className={styles.contentDetails}>
            {
                countryLoad ?
                <p>Loading...</p> :                 
                <div>
                    <div className = {styles.flagDetails}>
                        <img src = {myCountry.flag} alt="country flag"/>
                    </div>
                    <br></br>
                    <div className = {styles.countryDetailsBody}>
                        <div className = {styles.countryDetails}>                   
                            <h1>Name: {myCountry.name}</h1>
                            <br></br>
                            <h2>Id: {myCountry.id}</h2>
                            <br></br>
                            <h3>Capital: {myCountry.capital}</h3>
                            <br></br>
                            <h3>Subregion: {myCountry.subregion}</h3>
                            <br></br>
                            <h3>Area: {myCountry.area}</h3>
                            <br></br>
                            <h3>Population: {myCountry.population}</h3>
                            <br></br>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className = {styles.coutryActivities}>
                            {checkActivities()}
                            <br></br>
                            {myCountry.activities?.map(e => <div key={e}>
                                <ul>
                                    <li>Name: {e.name}</li>
                                    <br></br>
                                    <li>Difficulty: {e.difficulty}</li>
                                    <br></br>
                                    <li>Duration: {e.duration}</li>
                                    <br></br>
                                    <li>Season: {e.season}</li>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                </ul>
                            </div>
                            )}
                        </div> 
                    </div>                  
                </div>                
            }            
            </div>
            <div className = {styles.buttonDetailsLocation}>
            <NavLink to = '/home' className = {styles.buttonDetails}>Back to Home</NavLink>
            </div>            
        </div>
    )   
}