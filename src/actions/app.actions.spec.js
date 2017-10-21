/* eslint-disable no-undef */

import expect from 'expect';
import thunk from 'redux-thunk';
import appActions from './app.actions';
import constants from './constants';
import initialState from '../reducers/app.reducer';
import mockStore from '../mockStore';
import fetchMock from 'fetch-mock';
import geocodeResponse from '../data/geocode-response';

describe('async actions', () => {

  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  });

  it('should geocode a query', () => {

    const testQuery = 'Berlin, Germany';
    fetchMock
      .getOnce('/geocoder', { body: { address: testQuery }, headers: { 'content-type': 'application/json' } });

    const expectedActions = [
      { type: constants.GEOCODE_QUERY_REQUEST },
      { type: constants.GEOCODE_QUERY_SUCCESS, body: geocodeResponse }
    ];

    // Initialize mockstore with empty state
    const store = mockStore(initialState);

    return store.dispatch(appActions.changeQuery(testQuery)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });

    // // Test if your store dispatched the expected actions
    // const actions = store.getActions();
    // const expectedPayload = {
    //   type: constants.GEOCODE_QUERY_SUCCESS,
    //   payload: geocodeResponse
    // };
    // expect(actions).toEqual([expectedPayload]);
  });
});


describe('sync actions', () => {

  it('should dispatch an action when center is changed', () => {
    const testCenter = {
      lat: geocodeResponse.geometry.location.lat,
      lng: geocodeResponse.geometry.location.lng
    };
    const expectedAction = {
      type: constants.SET_CENTER,
      payload: testCenter
    };
    expect(
      appActions.setCenter(testCenter)
    ).toEqual(expectedAction);
  });

  it('should dispatch an action when radius is changed', () => {
    const testRadius = 5000;
    const expectedAction = {
      type: constants.SET_RADIUS,
      payload: testRadius
    };
    expect(
      appActions.setRadius(testRadius)
    ).toEqual(expectedAction);
  });

  // it('should dispatch an action to export geojson', () => {
  //   const testCenter = { lat: 52.511358, lng: 13.399321 };
  //   const testRadius = 5000;
  //   const expectedAction = {
  //     type: constants.EXPORT_GEOJSON,
  //     payload: testRadius
  //   };
  //   expect(
  //     actions.exportGeoJSON(testCenter, testRadius)
  //   ).toEqual(expectedAction);
  // });


});
