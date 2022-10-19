import { CREATE_ACTIVITY, GET_ALL_COUNTRIES, FILTER_BY_ACTIVITY, FILTER_BY_CONTINENT, SORT_BY_NAME, SORT_BY_POPULATION, GET_COUNTRY_BY_NAME } from "../actions";

const initialState = {
  allCountries: [],
  countries: [],
  countryDetail: {}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      // Acá va tu código:
        case CREATE_ACTIVITY:
          return {
              ...state
          }
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                countries: action.payload          
            } 
        case GET_COUNTRY_BY_NAME:
            return {
                ...state,
                countries: action.payload          
            } 
        case FILTER_BY_ACTIVITY:
            const toFilterByActivity = state.allCountries;
            const activityFilter = action.payload === 'act' ? 
            toFilterByActivity.filter(c => c.activities.length !== 0) : 
                action.payload === 'noA' ? 
                toFilterByActivity.filter(c => !c.activities.length) : toFilterByActivity
            return {
                ...state,
                countries: activityFilter
            }
        case FILTER_BY_CONTINENT:  
            const toFilterByContinent = state.allCountries;      
            const filteredByContinent = action.payload === 'All' ? 
                toFilterByContinent : 
                toFilterByContinent.filter(c => c.continent === action.payload)
            return {
                ...state,
                countries: filteredByContinent
            };
        case SORT_BY_NAME: 
            let sortedByName = action.payload === 'asc' ?
                state.countries.sort((a, b) => {
                  if(a.name > b.name) {
                    return 1
                  } else if (b.name > a.name) {
                    return -1
                  } else {
                    return 0
                  }}) : 
                state.countries.sort((a, b) => {
                  if(a.name > b.name) {
                    return -1
                  } else if (b.name > a.name) {
                    return 1
                  } else {
                    return 0
                  }}) 
            return {
                ...state,
                countries: sortedByName
            }
        case SORT_BY_POPULATION:
          let sortedByPopulation = action.payload === "asc" ? 
              state.countries.sort((a, b) => {
                  if (a.population > b.population) {
                    return 1;
                  }
                  if (b.population > a.population) {
                    return -1;
                  }
                    return 0;
                    
              })
              : state.countries.sort((a, b) => {
                  if (a.population > b.population) {
                    return -1;
                  }
                  if (b.population > a.population) {
                    return 1;
                  }
                    return 0;
              });
            return {
                ...state,
                countries: sortedByPopulation,
            };        
        default: 
            return {
                ...state
            }      
    }
  };
  
  export default rootReducer;