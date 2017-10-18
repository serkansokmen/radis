import { parseGeoJSON } from '../utils';

export const SET_QUERY = '[App] Set query';
export const SET_RADIUS = '[App] Set radius';
export const GEOCODE_QUERY_SUCCESS = '[App] Geocode query success';
export const GEOCODE_QUERY_ERROR = '[App] Geocode query error';
export const EXPORT_GEOJSON = '[App] Export GeoJSON';
export const EXPORT_GEOJSON_SUCCESS = '[App] Export GeoJSON success';
export const SET_VIEW_MODE = '[App] Set view mode';

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

export function exportGeoJSON(data) {
  return (dispatch) => {
    const result = parseGeoJSON(data);
    dispatch(setViewMode('code'));
    dispatch({
      type: EXPORT_GEOJSON_SUCCESS,
      payload: result
    })
  }
}

export function setViewMode(mode) {
  return {
    type: SET_VIEW_MODE,
    payload: mode
  }
}
