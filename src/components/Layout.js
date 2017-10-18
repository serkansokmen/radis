import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setQuery, setRadius, generateGeoJSON } from '../actions/app.actions';

// better performance for builds this way
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';

import { MapComponent } from './Map';


class Layout extends Component {

  componentWillMount() {
  }

  handleChange = (event) => {
    this.props.dispatch(setQuery(event.target.value));
  };

  render() {
    console.log(this.props);
    if (!this.props) {
      return null;
    }
    const { query, radius, lat, lng, zoom, gsoJSON, error, isFetching } = this.props;

    return (
      <div>
        <AppBar title="Radis"></AppBar>
        <TextField
          hintText="Search for a location"
          errorText="This field is required"
          fullWidth={true}
          onChange={this.handleChange}/>
        <Slider />
        <IconButton />
        <MapComponent
          lat={lat} lng={lng} radius={radius} zoom={zoom}/>
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
