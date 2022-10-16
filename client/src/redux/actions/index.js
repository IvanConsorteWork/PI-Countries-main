export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const GET_COUNTRY_DETAILS = "GET_COUNTRY_DETAILS";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";

export const getAllCountries = () => async dispatch => {
    const response = await fetch('http://localhost:3001/countries');
    const json = await response.json();
    dispatch({
        type: GET_ALL_COUNTRIES,
        payload: json
    });
 };

// export const getCountryDetail = (id) => async dispatch => {
//     return fetch('http://localhost:3001/countries/' + id)
//     .then(response => response.json())
//     .then(json => {
//         dispatch({ 
//             type: GET_COUNTRY_DETAILS, 
//             payload: json })
//     })
//  };

// export const createActivity = (values) => {
//     return {
//         type: CREATE_ACTIVITY,
//         payload: {
//             ...values,
//             id: id++
//         }
//     }
// };

// export const deleteActivity = (id) => {
//     return {
//         type: DELETE_ACTIVITY,
//         payload: id
//     }
//  };

export const filterByActivities = (payload) => {
    return {
      type: "FILTER_BY_ACTIVITY",
      payload
    }
};

export const filterByContinent = (payload) => {
    return {
      type:"FILTER_BY_CONTINENT",
      payload
    }
};
  
export const sortByAlphabet = (payload) => {
    return {
      type:'SORT_BY_ALPHABET',
      payload
    }
};
  
export const sortByPopulation = (payload) => {
    return {
      type: "ORDER_BY_POPULATION",
      payload
    }
};


