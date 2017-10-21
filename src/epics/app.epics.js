import constants from '../actions/constants';
import appActions from '../actions/app.actions';
import { requestGeocodingForQuery, parseGeoJSON } from '../utils';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

export const changeQueryEpic = (action$, store) =>
  action$
    .ofType(constants.CHANGE_QUERY)
    .switchMap(action => requestGeocodingForQuery(action.payload)
      .map(payload => appActions.geocodeQuerySuccess(payload))
      .catch(payload => [appActions.geocodeQueryError(payload)])
    )

export const parseGeoJSONEpic = (action$, store) =>
  action$
    .ofType(constants.EXPORT_GEOJSON)
    .switchMap(action =>
      parseGeoJSON(action.payload.center, action.payload.radius)
        .map(payload => appActions.exportGeoJSONSuccess(payload))
        .catch(payload => [appActions.exportGeoJSONError(payload)])
    );

export const exportGeoJSONEpic = (action$, store) =>
  action$
    .ofType(constants.GEOCODE_QUERY_SUCCESS)
    .map(action => appActions.exportGeoJSON(store.getState().app))

export const changeCenterEpic = (action$, store) =>
  action$
    .ofType(constants.SET_CENTER)
    .map(action => appActions.exportGeoJSON(store.getState().app))

export const changeRadiusEpic = (action$, store) =>
  action$
    .ofType(constants.SET_RADIUS)
    .map(action => appActions.exportGeoJSON(store.getState().app))

export const showCopiedNotificationEpic = action$ =>
  action$
    .ofType(constants.SHOW_COPIED_NOTIFICATION)
    .debounceTime(1200)
    .map(() => appActions.hideCopiedNotification());
