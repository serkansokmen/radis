import { combineEpics } from 'redux-observable';
import {
  changeQueryEpic,
  changeCenterEpic,
  changeRadiusEpic,
  parseGeoJSONEpic,
  exportGeoJSONEpic,
  showCopiedNotificationEpic
} from './app.epics';

export default combineEpics(
  changeQueryEpic,
  changeCenterEpic,
  changeRadiusEpic,
  parseGeoJSONEpic,
  exportGeoJSONEpic,
  showCopiedNotificationEpic,
);
