/* eslint-disable no-undef */

import { parseGeoJSON, requestGeocodingForQuery } from '../utils';
import constants from './constants';

export function geocodeQuery(query) {
  return (dispatch) => {
    dispatch(setQuery(query));
    requestGeocodingForQuery(query)
      .then((result) => dispatch(geocodeQuerySuccess(result)))
      .catch((error) => dispatch(geocodeQueryError(error)));
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
    parseGeoJSON(center, radius)
      .then(result => dispatch({
        type: constants.EXPORT_GEOJSON_SUCCESS,
        payload: result
      }));
    dispatch(setCodeViewDialogOpen(true));
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
