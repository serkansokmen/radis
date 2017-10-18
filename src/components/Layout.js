import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setQuery, setRadius, generateGeoJSON } from '../actions/app.actions';

// better performance for builds this way
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';

import { MapComponent } from './Map';
import { Throttle } from 'react-throttle';


class Layout extends Component {

  componentWillMount() {
  }

  handleQueryChange = (event) => {
    this.props.dispatch(setQuery(event.target.value));
  };

  handleRadiusChange = (event, newValue) => {
    this.props.dispatch(setRadius(newValue));
  };

  handleCircleRadiusChange = (event, newValue) => {
    console.log(event, newValue);
    this.props.dispatch(setRadius(newValue));
  };

  render() {
    const {
      query, radius,
      geocodeResult,
      defaultLatitude, defaultLongitude,
      zoom, gsoJSON, error, isFetching } = this.props;

    const latitude = geocodeResult ? geocodeResult.geometry.location.lat() : defaultLatitude;
    const longitude = geocodeResult ? geocodeResult.geometry.location.lng() : defaultLongitude;

    return (
      <div>
        <AppBar title="Radis"></AppBar>
        <Throttle time="800" handler="onChange">
          <TextField
            hintText="Search for a location"
            errorText={error}
            fullWidth={true}
            onChange={this.handleQueryChange}/>
        </Throttle>
        <IconButton />
        {
          geocodeResult &&
          <Throttle time="800" handler="onChange">
            <Slider
              defaultValue={radius}
              min={500}
              max={10000}
              onChange={this.handleRadiusChange}/>
          </Throttle>}
        {
          geocodeResult &&
          <MapComponent
            latitude={latitude}
            longitude={longitude}
            radius={radius}
            zoom={zoom}
            onCircleRadiusChange={this.handleCircleRadiusChange}/>
        }
      </div>
    );
  }
}

export default connect((store) => {
  return {
    ...store.app
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
