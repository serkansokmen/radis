/* eslint-disable no-undef */

import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from 'react-google-maps';
import { Throttle } from 'react-throttle';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import appActions from '../actions/app.actions';
import { CodeViewComponent } from './CodeView';

class MapView extends Component {

  onQueryChange = (event) => {
    const value = event.target.value;
    if (value.length >= 2) {
      this.props.dispatch(appActions.geocodeQuery(event.target.value));
    }
  };

  onRadiusSliderChange = (event, newValue) => {
    this.props.dispatch(appActions.setRadius(newValue));
  };

  onCircleRadiusChange = () => {
    const radius = this.refs.circle.getRadius();
    this.props.dispatch(appActions.setRadius(radius));
  };

  onCircleCenterChange = () => {
    const center = this.refs.circle.getCenter();
    this.props.dispatch(appActions.setCenter(center));
  };

  onExportButtonClick = (event) => {
    const { hasResult, radius, dispatch, center } = this.props;
    if (!hasResult) {
      return;
    }
    dispatch(appActions.exportGeoJSON(center, radius));
  };

  onCodeDialogClose = () => {
    this.props.dispatch(appActions.setCodeViewDialogOpen(false));
  };

  onCopy = (result) => {
    this.props.dispatch(appActions.setCopied());
    this.onCodeDialogClose();
  }

  render() {

    const {
      hasResult,
      formattedAddress,
      center,
      radius,
      zoom,
      geoJSON,
      isCodeDialogOpen,
      error
    } = this.props;

    const paperStyle = {
      margin: 20,
      padding: 15,
      textAlign: 'left',
      display: 'block',
    };
    const displayRadius = (radius / 1000).toFixed(2);
    const radiusDescription = `Radius: ${displayRadius} km.`;
    const dialogTitle = `${formattedAddress}, ${radiusDescription}`;

    return (
      <div>
        <Paper style={paperStyle}>
          <Throttle time="600" handler="onChange">
            <TextField
              hintText="Search for a location"
              errorText={error}
              fullWidth={true}
              onChange={this.onQueryChange}/>
          </Throttle>
        </Paper>

        <GoogleMap defaultZoom={zoom} center={center}>
          <Marker position={center}/>
          { hasResult &&
            <Circle
              ref="circle"
              radius={radius}
              center={center}
              editable={true}
              options={
                {'fillColor': 'red', 'strokeColor': 'red', 'fillOpacity': 0.3}
              }
              onCenterChanged={this.onCircleCenterChange}
              onRadiusChanged={this.onCircleRadiusChange}/>
            }
        </GoogleMap>

        { hasResult &&
          <Paper style={paperStyle}>
            <h1>{formattedAddress}</h1>
            <div>{radiusDescription}
              <Slider
                value={radius}
                min={500}
                max={10000}
                onChange={this.onRadiusSliderChange}/>
            </div>
            <FlatButton primary={true} fullWidth={true} onClick={this.onExportButtonClick}>Export to GeoJSON</FlatButton>
          </Paper>
        }

        <Dialog
          title={dialogTitle}
          modal={false}
          open={isCodeDialogOpen}
          onRequestClose={this.onCodeDialogClose}>
          <CodeViewComponent value={geoJSON} onCopy={this.onCopy}/>
        </Dialog>
      </div>
    )
  }
}

export const MapViewComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(MapView);

