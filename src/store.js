import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import rootEpics from './epics';

const epicMiddleware = createEpicMiddleware(rootEpics);
const middleware = applyMiddleware(thunk, logger, epicMiddleware);

export default createStore(rootReducer, composeWithDevTools(middleware));
