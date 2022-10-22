import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetails } from '../../redux/actions';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function CardDetails (props) {
    const dispatch = useDispatch();

    const myCountry = useSelector((state) => state.countryDetail);

    const [countryLoad, setCountryLoad] = useState(true);
    

    useEffect(()=>{
        const chargeCountry = async() => {   
            await dispatch(getCountryDetails(props.match.params.id)) 
            setCountryLoad(false)   
            };
        chargeCountry() 
    }, [dispatch, props.match.params.id])
   

    return (
        <div>
            {
                countryLoad ?
                <p>Loading...</p> :
                <div>
                    <div>
                        <img src = {myCountry.flag} alt="country flag"/>
                    </div>
                    <div>                   
                        <h1>Name:{myCountry.name}</h1>
                        <h2>Id:{myCountry.id}</h2>
                        <h3>Capital:{myCountry.capital}</h3>
                        <h3>Subregion:{myCountry.subregion}</h3>
                        <h3>Area:{myCountry.area}</h3>
                        <h3>Population:{myCountry.population}</h3>
                    </div>
                    <div >
                        {myCountry.activities.length?<h3><b>Activities: </b></h3>:""}
                        {myCountry.activities?.map(e=><div>
                            <ul>
                                <li>Name:{e.name}</li>
                                <li>Dificultad:{e.difficulty}</li>
                                <li>Duration:{e.duration}HS</li>
                                <li>Season:{e.season}</li>
                            </ul>
                    </div>
                    )}
                </div>
                    <Link to = '/home'>Back to Home</Link>
                </div>                
            }
        </div>
    )
}