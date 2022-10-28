import { CREATE_ACTIVITY, GET_ALL_ACTIVITIES, GET_ALL_COUNTRIES, GET_COUNTRY_BY_NAME, GET_COUNTRY_DETAILS, FILTER_BY_ACTIVITY, FILTER_BY_CONTINENT, SORT_BY_NAME, SORT_BY_POPULATION } from "../actions";

const initialState = {
  activities: [],
  allCountries: [],
  countries: [],
  countryDetail: [],
  // filterByActivity: [],
  // filterByContinent: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      // Acá va tu código:
        case CREATE_ACTIVITY:
          return {
              ...state
          }
        case GET_ALL_ACTIVITIES:
          return {
              ...state,
              activities: action.payload                    
          } 
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                countries: action.payload          
            } 
        case GET_COUNTRY_DETAILS:
            return {
              ...state,
              countryDetail: action.payload
            }
        case GET_COUNTRY_BY_NAME:
            return {
                ...state,
                countries: action.payload          
            } 
        case FILTER_BY_ACTIVITY:
            const toFilterByActivity = state.allCountries;
            const activityFilter = action.payload === 'all' ? toFilterByActivity :
                // toFilterByActivity.filter(c => c.activities.find((a) => a.name.toLowerCase() === action.payload.toLowerCase()));
                // console.log('Filtro', activityFilter)
                toFilterByActivity.filter((e) =>
                e.activities &&
                e.activities.map((e) => e.name).includes(action.payload));                
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
                allCountries: sortedByName,
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
                allCountries: sortedByPopulation,
                countries: sortedByPopulation,
            };   
        // case FILTER_BY_ACTIVITY:
        //     const toFilterByActivity = filterByContinent !== 'Applied' ? 
        //     state.allCountries : state.countries; 
        //     const activityFilter = action.payload === 'all' ? toFilterByActivity :
        //         toFilterByActivity.filter(c => c.activities.find((a) => a.name.toLowerCase() === action. payload.toLowerCase()));
        //         console.log('Filtro', activityFilter)
        //     state.filterByActivity = action.payload === 'All' ?
        //      [] : ['Applied']
        //     return {
        //         ...state,
        //         countries: activityFilter
        //     }
        // case FILTER_BY_CONTINENT:  
        //     const toFilterByContinent = filterByActivity !== 'Applied' ? 
        //     state.allCountries : state.countries;     
        //     const filteredByContinent = action.payload === 'All' ? 
        //         toFilterByContinent : 
        //         toFilterByContinent.filter(c => c.continent === action.payload)
        //     state.filterByContinent = action.payload === 'All' ?
        //     [] : ['Applied']
        //     return {
        //         ...state,
        //         countries: filteredByContinent
        //     };      
        default: 
            return {
                ...state
            }      
    }
  };
  
  export default rootReducer;