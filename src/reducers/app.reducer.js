import {
  SET_QUERY,
  SET_RADIUS,
  GEOCODE_QUERY_SUCCESS,
  GEOCODE_QUERY_ERROR,
  GENERATE_GEOJSON
} from '../actions/app.actions.js'

const initialState = {
  query: '',
  radius: 500,
  lat: 52.511358,
  lng: 13.399321,
  radius: 5000,
  zoom: 12,
  geoJSON: '',
  error: null,
  isFetching: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        isFetching: true,
        error: null
      }

    case GEOCODE_QUERY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lat: action.payload.lat,
        lng: action.payload.lng,
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
