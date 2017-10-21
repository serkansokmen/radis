/* eslint-disable no-undef */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

export const requestGeocodingForQuery = (query) => {
  return Observable.fromPromise(new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': query
    }, (results, status) => {
      if (status === 'OK') {
        resolve(results[0]);
      } else {
        reject(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  }));
}

export const parseGeoJSON = (center, radius, numSides = 25) => {
  return Observable.fromPromise(new Promise((resolve, reject) => {
    const centerLatLng = new google.maps.LatLng(center.lat, center.lng);
    const points = [];
    const step = 360 / numSides;

    for (var i = 0; i < numSides; i++) {
      const gpos = google.maps.geometry.spherical.computeOffset(centerLatLng, radius, step * i);
      points.push([gpos.lng(), gpos.lat()]);
    };

    // Duplicate the last point and close the circle
    points.push(points[0]);
    const result = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [ points ]
        }
      }]
    };

    resolve(JSON.stringify(result, null, 2));
  }));
}
