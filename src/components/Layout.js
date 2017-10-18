import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setQuery, setRadius, generateGeoJSON } from '../actions/app.actions';

class Layout extends Component {

  componentWillMount() {
    // this.props.dispatch(fetchItems());
  }

  render() {
    const { isFetching } = this.props;

    return (
      <div className="App">
      </div>
    );
  }
}

export default connect((store) => {
  return {
    query: store.app.query,
    radius: store.app.radius,
    lat: store.app.lat,
    lng: store.app.lng,
    geoJSON: store.app.geoJSON,
    error: store.app.error,
    isFetching: store.app.isFetching,
  }
})(Layout);
