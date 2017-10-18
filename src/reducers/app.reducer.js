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
  lat: false,
  lng: false,
  geoJSON: '',
  error: null,
  isFetching: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    // case FETCH_START:
    //   return {
    //     ...state,
    //     isFetching: true,
    //     error: null
    //   }
    // case FETCH_SUCCESS:
    //   return {
    //     ...state,
    //     isFetching: false,
    //     items: action.payload
    //   }
    // case FETCH_ERROR:
    //   return {
    //     ...state,
    //     isFetching: false,
    //     error: action.payload
    //   }
    default:
      return state;
  }
}
