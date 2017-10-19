import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

// Syntax highlighter registers only necessary languages
import { registerLanguage } from 'react-syntax-highlighter/dist/light';
import json from 'react-syntax-highlighter/dist/languages/json';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from './store';

injectTapEventPlugin();
registerLanguage('json', json);
registerServiceWorker();

ReactDOM.render(<App store={store}/>, document.getElementById('root'));

