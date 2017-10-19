import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { MapViewComponent } from './components/MapView';

class App extends Component {

  render() {
    return <Provider store={this.props.store}>
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <MapViewComponent {...this.props}/>
      </MuiThemeProvider>
    </Provider>
  }
}

export default connect((state) => {
  return { ...state.app }
})(App);
