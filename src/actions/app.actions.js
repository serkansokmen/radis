// import axios from 'axios';

export const SET_QUERY = '[App] Geocode query';
export const SET_RADIUS = '[App] Set radius';
export const GEOCODE_QUERY_SUCCESS = '[App] Geocode query success';
export const GEOCODE_QUERY_ERROR = '[App] Geocode query error';
export const GENERATE_GEOJSON = '[App] Export GeoJSON';


export function setQuery(query) {
  return (dispatch) => {
    dispatch({ type: SET_QUERY, payload: null });
    // geocode query string
    // axios.get('http://rest.learncode.academy/api/wstern/users')
    //   .then((response) => {
    //     dispatch({ type: GEOCODE_QUERY_SUCCESS, payload: response.data });
    //   })
    //   .catch((err) => {
    //     dispatch({ type: GEOCODE_QUERY_ERROR, payload: err });
    //   });
  }
}

export function setRadius(radius) {
  return {
    type: SET_RADIUS,
    payload: radius
  }
}

export function generateGeoJSON() {
  return {
    type: GENERATE_GEOJSON
  }
}
