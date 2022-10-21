import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetails } from '../../redux/actions';
import { useEffect } from "react";

export default function CardDetails (props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountryDetails(props.match.params.id))
    }, [dispatch])
    
    const myCountry = useSelector((state) => state.countryDetail)
    console.log(myCountry)

    return(
        <div>
            {
                myCountry.length > 0 ?
                <div>
                    <div>
                    <img src={myCountry.flag} alt="country flag"/>
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
                </div> :
                <p>Loading...</p>
                
            }
        </div>
    )


}