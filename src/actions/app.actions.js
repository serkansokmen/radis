import { parseGeoJSON } from '../utils';

export const SET_QUERY = '[App] Set query';
export const SET_CENTER = '[App] Set center';
export const SET_RADIUS = '[App] Set radius';
export const GEOCODE_QUERY_SUCCESS = '[App] Geocode query success';
export const GEOCODE_QUERY_ERROR = '[App] Geocode query error';
export const EXPORT_GEOJSON = '[App] Export GeoJSON';
export const EXPORT_GEOJSON_SUCCESS = '[App] Export GeoJSON success';
export const SET_CODE_VIEW_DIALOG_OPEN = '[App] Set code view dialog open';

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

export function setCenter(center) {
  return {
    type: SET_CENTER,
    payload: center
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
    dispatch(setCodeViewDialogOpen(true));
    dispatch({
      type: EXPORT_GEOJSON_SUCCESS,
      payload: result
    })
  }
}

export function setCodeViewDialogOpen(isOpen) {
  return {
    type: SET_CODE_VIEW_DIALOG_OPEN,
    payload: isOpen
  }
}
