import { GET_ALL_COUNTRIES, GET_COUNTRY_DETAILS, CREATE_ACTIVITY, DELETE_ACTIVITY, FILTER_BY_CONTINENT } from "../actions";

const initialState = {
  allCountries: [],
  countries: [],
  countryDetail: {},
  activities: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      // Acá va tu código:
      case GET_ALL_COUNTRIES:
        return {
          ...state,
          allCountries: action.payload,
          countries: action.payload          
        }
      // case GET_COUNTRY_DETAILS:
      //   return {
      //     ...state,
      //     countryDetail: action.payload
      //   }
      // case CREATE_ACTIVITY:
      //   return {
      //     ...state,
      //     activities: [...state.activities, action.payload]
      //   }
      // case DELETE_ACTIVITY:
      //   return {
      //     ...state,
      //     activities: state.activities.filter(activity => activity.id !== action.payload)
      //   }
      case FILTER_BY_CONTINENT:
      const allCountries = state.allCountries;
      const countriesFiltered = action.payload === 'All' ? 
      allCountries : 
      allCountries.filter(c => c.continent === action.payload)
      return {
        ...state,
        countries: countriesFiltered
      };
      default: return {
        ...state
      }      
    }
  };
  
  export default rootReducer;