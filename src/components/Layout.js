import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionCode from 'material-ui/svg-icons/action/code';
import MapsEditLocation from 'material-ui/svg-icons/maps/edit-location';
import { MapViewComponent } from './MapView';

class Layout extends Component {

  render() {
    return (
      <div>
        <AppBar title="Radis"></AppBar>
        <MapViewComponent {...this.props}/>
      </div>
    );
  }
}

export default connect((state) => {
  return { ...state.app }
})(Layout);
