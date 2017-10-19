/* eslint-disable no-undef */

import { parseGeoJSON } from '../utils';

export const SET_QUERY = '[App] Set query';
export const SET_PLACE_RESULT = '[App] Set place result';
export const SET_CENTER = '[App] Set center';
export const SET_RADIUS = '[App] Set radius';
export const GEOCODE_QUERY_SUCCESS = '[App] Geocode query success';
export const GEOCODE_QUERY_ERROR = '[App] Geocode query error';
export const EXPORT_GEOJSON = '[App] Export GeoJSON';
export const EXPORT_GEOJSON_SUCCESS = '[App] Export GeoJSON success';
export const SET_CODE_VIEW_DIALOG_OPEN = '[App] Set code view dialog open';
export const SET_COPIED = '[App] Set copied';

export function setQuery(query) {
  return (dispatch) => {
    dispatch({ type: SET_QUERY, payload: query });
    // geocode query string
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

export function exportGeoJSON(center, radius) {
  return (dispatch) => {
    const result = parseGeoJSON(center, radius);
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

export function setPlaceResult(result) {
  return {
    type: SET_PLACE_RESULT,
    payload: result
  }
}

export function setCopied() {
  return {
    type: SET_COPIED,
    payload: true
  }
}

export default {
  setQuery,
  setCenter,
  setRadius,
  exportGeoJSON,
  setCodeViewDialogOpen,
  setCopied,
}
