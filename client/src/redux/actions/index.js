import axios from 'axios';

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_DETAILS = "GET_COUNTRY_DETAILS";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVTY";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_POPULATION = "SORT_BY_POPULATION";


export const getAllCountries = () => async dispatch => {
  return fetch('http://localhost:3001/countries')
  .then(response => response.json())
  .then(json => {
      dispatch({ 
          type: GET_ALL_COUNTRIES, 
          payload: json })
  })
};

export const getCountryByName = (name) => async dispatch => {
    try {
      return fetch(`http://localhost:3001/countries?name=${name}`)
      .then(response => response.json())
      .then(json => {
          dispatch({ 
              type: GET_COUNTRY_BY_NAME, 
              payload: json })
          })
    } catch (e) {
        console.log(e)
    }    
};

export const getCountryDetails = (id) => async dispatch => {
  try {
    return fetch(`http://localhost:3001/countries/${id}`)
    .then(response => response.json())
    .then(json => {
        dispatch({ 
            type: GET_COUNTRY_DETAILS, 
            payload: json})
        })
  } catch (e) {
      console.log(e)
  }    
};

export const createActivity = (payload) => {
    return async function (dispatch) {
        var response = await axios.post('http://localhost:3001/activities', payload);
        return response
    }
};

// export const deleteActivity = (id) => {
//     return {
//         type: DELETE_ACTIVITY,
//         payload: id
//     }
//  };

export const filterByActivity = (payload) => {
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
  
export const sortByName = (payload) => {
    return {
      type:'SORT_BY_NAME',
      payload
    }
};
  
export const sortByPopulation = (payload) => {
    return {
      type: "SORT_BY_POPULATION",
      payload
    }
};


