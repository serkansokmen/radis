import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setQuery, setRadius, exportGeoJSON, setViewMode } from '../actions/app.actions';
import { Throttle } from 'react-throttle';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';
import ActionCode from 'material-ui/svg-icons/action/code';
import MapsEditLocation from 'material-ui/svg-icons/maps/edit-location';
import { MapViewComponent } from './MapView';
import { CodeViewComponent } from './CodeView';


class Layout extends Component {

  componentDidMount() {
    this.props.dispatch(setViewMode('map'));
  }

  handleQueryChange = (event) => {
    const value = event.target.value;
    if (value.length >= 2) {
      this.props.dispatch(setQuery(event.target.value));
    }
  };

  handleRadiusChange = (event, newValue) => {
    this.props.dispatch(setRadius(newValue));
  };

  handleCircleRadiusChange = (newValue) => {
    this.props.dispatch(setRadius(newValue));
  };

  handleCodeViewItemClick = (event) => {
    const { geocodeResult, radius, dispatch } = this.props;
    if (!geocodeResult) {
      return;
    }
    dispatch(exportGeoJSON({
      lat: geocodeResult.geometry.location.lat(),
      lng: geocodeResult.geometry.location.lng(),
      radius: radius,
    }));
  };

  handleMapViewItemClick = (event) => {
    this.props.dispatch(setViewMode('map'));
  };

  handleOnCopy = (event) => {
    alert('GeoJSON copied to clipboard');
  };

  render() {
    const {
      radius,
      geocodeResult,
      defaultLatitude, defaultLongitude,
      zoom, geoJSON, error,
      isMapView } = this.props;

    const latitude = geocodeResult ? geocodeResult.geometry.location.lat() : defaultLatitude;
    const longitude = geocodeResult ? geocodeResult.geometry.location.lng() : defaultLongitude;

    const leftBarButtonItemCodeView = <IconButton
      tooltip="Code View"
      tooltipPosition="bottom-right"
      onClick={this.handleCodeViewItemClick}
      disabled={!geocodeResult}><ActionCode/></IconButton>
    const leftBarButtonItemMapView = <IconButton
      tooltip="Map View"
      tooltipPosition="bottom-right"
      onClick={this.handleMapViewItemClick}><MapsEditLocation/></IconButton>
    const leftBarButtonItem = isMapView ? leftBarButtonItemCodeView : leftBarButtonItemMapView;

    return (
      <div>
        <AppBar title="Radis"
          iconElementRight={leftBarButtonItem}></AppBar>

        {
          isMapView &&
          <Throttle time="600" handler="onChange">
            <TextField
              hintText="Search for a location"
              errorText={error}
              fullWidth={true}
              onChange={this.handleQueryChange}/>
          </Throttle>
        }
        {
          isMapView && geocodeResult &&
          <Slider
            value={radius}
            min={500}
            max={10000}
            onChange={this.handleRadiusChange}/>
        }
        {
          isMapView ?
            geocodeResult && <MapViewComponent
              latitude={latitude}
              longitude={longitude}
              radius={radius}
              zoom={zoom}
              onCircleRadiusChange={this.handleCircleRadiusChange}/>
            :
            geocodeResult && <CodeViewComponent value={geoJSON} onCopy={this.handleOnCopy}/>
        }
      </div>
    );
  }
}

export default connect((store) => {
  return {
    ...store.app,
    isMapView: store.app.viewMode === 'map'
    // query: store.app.query,
    // radius: store.app.radius,
    // zoom: store.app.zoom,
    // lat: store.app.lat,
    // lng: store.app.lng,
    // geoJSON: store.app.geoJSON,
    // error: store.app.error,
    // isFetching: store.app.isFetching,
  }
})(Layout);
