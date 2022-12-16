import axios from 'axios';

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_DETAILS = "GET_COUNTRY_DETAILS";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
// export const DELETE_ACTIVITY = "DELETE_ACTIVITY";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVTY";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_POPULATION = "SORT_BY_POPULATION";

export function getAllCountries() {
  return async function (dispatch) {
    var json = await axios.get("/countries");
    return dispatch({
      type: GET_ALL_COUNTRIES,
      payload: json.data,
    });
  };
}

export function getCountryByName(name){
  return async function (dispatch){
    try {
      var json=await axios.get(`/countries?name=${name}`)
      return dispatch({
        type: GET_COUNTRY_BY_NAME,
        payload: json.data
      })
    } catch (error) {
      alert('Country not found')
    }
  }
  }

export function getCountryDetails(id){
  return async function(dispatch){
    try {
      var json=await axios.get(`/countries/${id}`)  
      return dispatch({
        type: GET_COUNTRY_DETAILS,
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const createActivity = (payload) => {
    return async function (dispatch) {
      try {
        var response = await axios.post('/activities', payload);
        return response
      } catch (e) {
        alert(e)
      }        
    }
};

// export const deleteActivity = (id) => {
//     return {
//         type: DELETE_ACTIVITY,
//         payload: id
//     }
//  };

export function getAllActivities(){
  return async function (dispatch){
      var json=await axios.get(`/activities`)
      return dispatch({
        type: GET_ALL_ACTIVITIES,
        payload: json.data
      });
  }
} 

export const filterByActivity = (payload) => {
    return {
      type: FILTER_BY_ACTIVITY,
      payload
    }
};

export const filterByContinent = (payload) => {
    return {
      type: FILTER_BY_CONTINENT,
      payload
    }
};
  
export const sortByName = (payload) => {
    return {
      type: SORT_BY_NAME,
      payload
    }
};
  
export const sortByPopulation = (payload) => {
    return {
      type: SORT_BY_POPULATION,
      payload
    }
};


