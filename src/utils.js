/* eslint-disable no-undef */

export const parseGeoJSON = (center, radius, numSides = 25) => {

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
    return JSON.stringify(result, null, 2);
  }
