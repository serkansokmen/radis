import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';


export const MapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD2g61s0CXpGgWC6aSfgU9RZHlZ7SING1c',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const { lat, lng, radius, zoom } = props;
  console.log(lat, lng, radius, zoom);
  return (
    <GoogleMap defaultZoom={zoom} defaultCenter={{ lat, lng }}>

    </GoogleMap>
  )
});
