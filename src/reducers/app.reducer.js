import constants from '../actions/constants';

const initialState = {
  query: '',
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

    case constants.SET_QUERY:
      return { ...state, query: action.payload }

    case constants.GEOCODE_QUERY_SUCCESS:
      return {
        ...state,
        center: {
          lat: action.payload.geometry.location.lat(),
          lng: action.payload.geometry.location.lng(),
        },
        formattedAddress: action.payload.formatted_address,
        hasResult: true,
        isFetching: false,
        error: null
      }

    case constants.GEOCODE_QUERY_ERROR:
      return {
        ...state,
        hasResult: false,
        isFetching: false,
        error: action.payload
      }

    case constants.SET_CENTER:
      return {
        ...state,
        center: {
          lat: typeof(action.payload.lat) === 'function' ? action.payload.lat() : action.payload.lat,
          lng: typeof(action.payload.lng) === 'function' ? action.payload.lng() : action.payload.lng
        }
      }

    case constants.SET_RADIUS:
      return { ...state, radius: action.payload }

    case constants.EXPORT_GEOJSON:
      return { ...state, geoJSON: '' }

    case constants.EXPORT_GEOJSON_SUCCESS:
      return { ...state, geoJSON: action.payload }

    case constants.SET_CODE_VIEW_DIALOG_OPEN:
      return { ...state, isCodeDialogOpen: action.payload }

    case constants.SET_COPIED:
      return { ...state, isCopied: action.payload }

    default:
      return state;
  }
}
