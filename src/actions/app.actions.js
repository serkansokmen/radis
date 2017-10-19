/* eslint-disable no-undef */

import { parseGeoJSON } from '../utils';
import constants from './constants';

export function geocodeQuery(query) {
  return (dispatch) => {
    dispatch(setQuery(query));
    // geocode query string
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': query
    }, (results, status) => {
      if (status === 'OK') {
        dispatch(geocodeQuerySuccess(results[0]));
      } else {
        dispatch(geocodeQueryError(`Geocode was not successful for the following reason: ${status}`));
      }
    });
  }
}

function setQuery(query) {
  return {
    type: constants.SET_QUERY,
    payload: query
  }
}

function geocodeQuerySuccess(result) {
  return {
    type: constants.GEOCODE_QUERY_SUCCESS,
    payload: result
  }
}

function geocodeQueryError(error) {
  return {
    type: constants.GEOCODE_QUERY_ERROR,
    payload: error
  }
}

export function setCenter(center) {
  return {
    type: constants.SET_CENTER,
    payload: center
  }
}

export function setRadius(radius) {
  return {
    type: constants.SET_RADIUS,
    payload: radius
  }
}

export function exportGeoJSON(center, radius) {
  return (dispatch) => {
    const result = parseGeoJSON(center, radius);
    dispatch(setCodeViewDialogOpen(true));
    dispatch({
      type: constants.EXPORT_GEOJSON_SUCCESS,
      payload: result
    })
  }
}

export function setCodeViewDialogOpen(isOpen) {
  return {
    type: constants.SET_CODE_VIEW_DIALOG_OPEN,
    payload: isOpen
  }
}

export function setCopied() {
  return {
    type: constants.SET_COPIED,
    payload: true
  }
}

export default {
  geocodeQuery,
  setCenter,
  setRadius,
  exportGeoJSON,
  setCodeViewDialogOpen,
  setCopied,
}
