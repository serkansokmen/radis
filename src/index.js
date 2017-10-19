import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import Layout from './components/Layout';
import store from './store';

import registerServiceWorker from './registerServiceWorker';


// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Syntax highlighter registers only necessary languages
import { registerLanguage } from 'react-syntax-highlighter/dist/light';
import json from 'react-syntax-highlighter/dist/languages/json';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
registerLanguage('json', json);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Layout />
    </MuiThemeProvider>
  </Provider>, document.getElementById('root'));

registerServiceWorker();
