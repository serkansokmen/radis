import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MapViewComponent } from './MapView';

class Layout extends Component {

  render() {
    return <MapViewComponent {...this.props}/>;
  }
}

export default connect((state) => {
  return { ...state.app }
})(Layout);
