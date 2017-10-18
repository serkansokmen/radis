export const SET_QUERY = '[App] Set query';
export const QUERY_INVALID = '[App] Query invalid';
export const SET_RADIUS = '[App] Set radius';
export const GEOCODE_QUERY_SUCCESS = '[App] Geocode query success';
export const GEOCODE_QUERY_ERROR = '[App] Geocode query error';
export const GENERATE_GEOJSON = '[App] Export GeoJSON';


export function setQuery(query) {
  return (dispatch) => {
    dispatch({ type: SET_QUERY, payload: query });
    // geocode query string
    const google = window.google;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': query
    }, (results, status) => {
      if (status === 'OK') {
        dispatch({ type: GEOCODE_QUERY_SUCCESS, payload: results[0] });
      } else {
        dispatch({
          type: GEOCODE_QUERY_ERROR,
          payload: `Geocode was not successful for the following reason: ${status}`
        });
      }
    });
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
