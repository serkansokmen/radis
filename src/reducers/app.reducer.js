import {
  SET_QUERY,
  SET_RADIUS,
  GEOCODE_QUERY_SUCCESS,
  GEOCODE_QUERY_ERROR,
  GENERATE_GEOJSON
} from '../actions/app.actions.js'

const initialState = {
  query: '',
  defaultLatitude: 52.511358,
  defaultLongitude: 13.399321,
  radius: 5000,
  zoom: 12,
  geocodeResult: null,
  geoJSON: '',
  error: null,
  isFetching: false,
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

    case SET_RADIUS:
      return {
        ...state,
        radius: action.payload
      }

    case GEOCODE_QUERY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        geocodeResult: action.payload,
        error: null
      }

    case GEOCODE_QUERY_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }

    default:
      return state;
  }
}
