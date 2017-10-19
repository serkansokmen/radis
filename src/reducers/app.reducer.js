import {
  SET_QUERY,
  SET_CENTER,
  SET_RADIUS,
  GEOCODE_QUERY_SUCCESS,
  GEOCODE_QUERY_ERROR,
  EXPORT_GEOJSON,
  EXPORT_GEOJSON_SUCCESS,
  SET_CODE_VIEW_DIALOG_OPEN,
  SET_COPIED
} from '../actions/app.actions.js'

const initialState = {
  query: '',
  bounds: null,
  center: {
    lat: 52.511358,
    lng: 13.399321,
  },
  radius: 5000,
  zoom: 11,
  hasResult: false,
  formattedAddress: '',
  geoJSON: '',
  error: null,
  isFetching: false,
  isCodeDialogOpen: false,
  isCopied: false,
};

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
        isFetching: true,
        error: null
      }

    case SET_CENTER:
      return {
        ...state,
        center: {
          lat: action.payload.lat(),
          lng: action.payload.lng()
        }
      }

    case SET_RADIUS:
      return { ...state, radius: action.payload }

    case GEOCODE_QUERY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasResult: true,
        latitude: action.payload.geometry.location.lat(),
        longitude: action.payload.geometry.location.lng(),
        formattedAddress: action.payload.formatted_address,
        error: null
      }

    case GEOCODE_QUERY_ERROR:
      return {
        ...state,
        hasResult: false,
        isFetching: false,
        error: action.payload
      }

    case EXPORT_GEOJSON:
      return { ...state, geoJSON: '' }

    case EXPORT_GEOJSON_SUCCESS:
      return { ...state, geoJSON: action.payload }

    case SET_CODE_VIEW_DIALOG_OPEN:
      return { ...state, isCodeDialogOpen: action.payload }

    case SET_COPIED:
      return { ...state, isCopied: action.payload }

    default:
      return state;
  }
}
