import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withGoogleMap, GoogleMap, Circle } from 'react-google-maps';

class Map extends Component {

  handleRadiusChange() {
    console.log(this.refs.circle);
  }

  render() {
    const { latitude, longitude, radius, zoom, onCircleRadiusChange } = this.props;
    const center = { lat: latitude, lng: longitude };
    return (
      <GoogleMap defaultZoom={zoom} center={center}>
        <Circle
          ref="circle"
          radius={radius}
          center={center}
          editable={true}
          options={
            {'fillColor': 'red'}
          }
          onRadiusChanged={this.handleRadiusChange}/>
      </GoogleMap>
    )
  }
}

export const MapComponent = compose(
  withProps({
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withGoogleMap
)(Map);
