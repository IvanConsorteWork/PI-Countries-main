import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetails } from '../../redux/actions';
import { useEffect } from "react";

export default function CardDetails (props) {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCountryDetails(props.match.params.id))
    }, [dispatch])
    
    const myCountry = useSelector((state) => state.countryDetails)

    return(
        <div>
            {
                myCountry.length > 0?
                <div>
                    <div>
                    <img src={myCountry[0].flag} alt="country flag"/>
                    </div>
                    <div>
                        
                    
                    <h1>Name:{myCountry[0].name}</h1>
                    <h2>Id:{myCountry[0].id}</h2>
                    <h3>Capital:{myCountry[0].capital}</h3>
                    <h3>Subregion:{myCountry[0].subregion}</h3>
                    <h3>Area:{myCountry[0].area}</h3>
                    <h3>Population:{myCountry[0].population}</h3>
                    </div>
                    <div >
                    {myCountry[0].activities.length?<h3><b>Activities: </b></h3>:""}
                    {myCountry[0].activities?.map(e=><div>
                    <ul>
                    <li>Name:{e.name}</li>
                    <li>Dificultad:{e.difficulty}</li>
                    <li>Duration:{e.duration}HS</li>
                    <li>Season:{e.season}</li>
                    </ul>
                </div>
          )}
                </div></div>:<p>Loading...</p>
                
            }
        </div>
    )


}