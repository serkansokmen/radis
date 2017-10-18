import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withGoogleMap, GoogleMap, Circle } from 'react-google-maps';

class MapView extends Component {

  handleRadiusChange() {
    const radius = this.refs.circle.getRadius();
    this.props.onCircleRadiusChange(radius);
  }

  render() {
    const { latitude, longitude, radius, zoom } = this.props;
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
          onRadiusChanged={this.handleRadiusChange.bind(this)}/>
      </GoogleMap>
    )
  }
}

export const MapViewComponent = compose(
  withProps({
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withGoogleMap
)(MapView);
