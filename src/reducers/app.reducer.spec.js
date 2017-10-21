import reducer, { initialState } from './app.reducer';
import actions from '../actions/app.actions';
import constants from '../actions/constants';
import geocodeResponse from '../data/geocode-response';

it('should set query', () => {
  const stateAfter = {
    ...initialState,
    query: 'Berlin, Germany'
  };
  expect(
    reducer(initialState, actions.changeQuery('Berlin, Germany'))
  ).toEqual(stateAfter);
});

it('should set geocode query success', () => {
  const stateAfter = {
    ...initialState,
    center: {
      lat: geocodeResponse.geometry.location.lat,
      lng: geocodeResponse.geometry.location.lng,
    },
    formattedAddress: geocodeResponse.formatted_address,
    hasResult: true,
    isFetching: false,
    error: null
  };
  expect(
    reducer(initialState, actions.geocodeQuerySuccess(geocodeResponse))
  ).toEqual(stateAfter);
});


it('should set center', () => {
  const stateAfter = {
    ...initialState,
    center: {
      lat: geocodeResponse.geometry.location.lat,
      lng: geocodeResponse.geometry.location.lng,
    }
  };
  expect(
    reducer(initialState, actions.setCenter(stateAfter.center))
  ).toEqual(stateAfter);
});

it('should set radius', () => {
  const stateAfter = {
    ...initialState,
    radius: 12000
  };
  expect(
    reducer(initialState, actions.setRadius(12000))
  ).toEqual(stateAfter);
});
