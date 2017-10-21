import constants from './constants';

function changeQuery(payload) {
  return {
    type: constants.CHANGE_QUERY,
    payload
  }
}

function geocodeQuerySuccess(payload) {
  return {
    type: constants.GEOCODE_QUERY_SUCCESS,
    payload
  }
}

function geocodeQueryError(payload) {
  return {
    type: constants.GEOCODE_QUERY_ERROR,
    payload
  }
}

function setCenter(payload) {
  return {
    type: constants.SET_CENTER,
    payload
  }
}

function setRadius(payload) {
  return {
    type: constants.SET_RADIUS,
    payload
  }
}

function exportGeoJSON(payload) {
  return {
    type: constants.EXPORT_GEOJSON,
    payload: {
      center: payload.center,
      radius: payload.radius
    }
  }
}

function exportGeoJSONSuccess(payload) {
  return {
    type: constants.EXPORT_GEOJSON_SUCCESS,
    payload
  }
}

function exportGeoJSONError(payload) {
  return {
    type: constants.EXPORT_GEOJSON_ERROR,
    payload
  }
}

function setCodeViewDialogOpen(payload) {
  return {
    type: constants.SET_CODE_VIEW_DIALOG_OPEN,
    payload
  }
}

function showCopiedNotification() {
  return {
    type: constants.SHOW_COPIED_NOTIFICATION
  }
}

function hideCopiedNotification() {
  return {
    type: constants.HIDE_COPIED_NOTIFICATION
  }
}

export default {
  changeQuery,
  geocodeQuerySuccess,
  geocodeQueryError,
  setCenter,
  setRadius,
  exportGeoJSON,
  exportGeoJSONSuccess,
  exportGeoJSONError,
  setCodeViewDialogOpen,
  showCopiedNotification,
  hideCopiedNotification,
}
