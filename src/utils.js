const google = window.google;

export const parseGeoJSON = (data, numSides = 25) => {

    const center = new google.maps.LatLng(data.lat, data.lng);
    const points = [];
    const step = 360 / numSides;

    for (var i = 0; i < numSides; i++) {
      const gpos = google.maps.geometry.spherical.computeOffset(
        center, data.radius, step * i);
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
