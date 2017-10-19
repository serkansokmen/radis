import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withGoogleMap, GoogleMap, Circle } from 'react-google-maps';
import { Throttle } from 'react-throttle';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { setQuery, setCenter, setRadius, exportGeoJSON, setCodeViewDialogOpen } from '../actions/app.actions';
import { CodeViewComponent } from './CodeView';

class MapView extends Component {

  handleQueryChange = (event) => {
    const value = event.target.value;
    if (value.length >= 2) {
      this.props.dispatch(setQuery(event.target.value));
    }
  };

  handleRadiusSliderChange = (event, newValue) => {
    this.props.dispatch(setRadius(newValue));
  };

  handleCircleRadiusChange = () => {
    const radius = this.refs.circle.getRadius();
    this.props.dispatch(setRadius(radius));
  };

  handleMapCenterChange = (center) => {
    this.props.dispatch(setCenter(center));
  };

  handleCircleCenterChange = () => {
    const center = this.refs.circle.getCenter();
    this.handleMapCenterChange(center);
  };

  handleExportButtonClick = (event) => {
    const { hasResult, radius, dispatch, latitude, longitude } = this.props;
    if (!hasResult) {
      return;
    }
    dispatch(exportGeoJSON({
      lat: latitude,
      lng: longitude,
      radius: radius,
    }));
  };

  handleCodeDialogClose = () => {
    this.props.dispatch(setCodeViewDialogOpen(false));
  };

  handleOnCopy = (result) => {
    alert('Copied to the clipboard');
  }

  render() {

    const {
      hasResult,
      formattedAddress,
      latitude,
      longitude,
      radius,
      zoom,
      geoJSON,
      isCodeDialogOpen,
      error
    } = this.props;

    const center = { lat: latitude, lng: longitude };
    const controlsStyle = {
      margin: 20,
      padding: 15,
      textAlign: 'left',
      display: 'block',
    };
    const displayRadius = (radius / 1000).toFixed(2);
    const radiusDescription = `Radius: ${displayRadius} km.`;
    const dialogTitle = `${formattedAddress}, ${radiusDescription}`;

    return (
      <div className="container">
        <GoogleMap defaultZoom={zoom} center={center}>
          { hasResult &&
            <Circle
              ref="circle"
              radius={radius}
              center={center}
              editable={true}
              options={
                {'fillColor': 'red', 'strokeColor': 'red', 'fillOpacity': 0.3}
              }
              onCenterChanged={this.handleCircleCenterChange.bind(this)}
              onRadiusChanged={this.handleCircleRadiusChange}/>
            }
        </GoogleMap>

        <Paper style={controlsStyle}>
          <Throttle time="600" handler="onChange">
            <TextField
              hintText="Search for a location"
              errorText={error}
              fullWidth={true}
              onChange={this.handleQueryChange}/>
          </Throttle>
          <p>{formattedAddress}</p>
          { hasResult &&
            <div>
              <div>{radiusDescription}
                <Slider
                  value={radius}
                  min={500}
                  max={10000}
                  onChange={this.handleRadiusSliderChange}/>
              </div>
              <FlatButton primary={true} fullWidth={true} onClick={this.handleExportButtonClick}>Export to GeoJSON</FlatButton>
            </div>
          }
        </Paper>

        <Dialog
          title={dialogTitle}
          modal={false}
          open={isCodeDialogOpen}
          onRequestClose={this.handleCodeDialogClose}>
          <CodeViewComponent value={geoJSON} onCopy={this.handleOnCopy.bind(this)}/>
        </Dialog>
      </div>
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
