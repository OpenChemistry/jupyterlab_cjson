import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {createLogger} from 'redux-logger'
import { auth } from '@openchemistry/girder-redux';

import reducers from './reducers';
import rootSaga from './sagas';

const rootReducer = combineReducers((reducers));

const authSelector = state => state.auth;
auth.selectors.setRoot(authSelector);

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);

// if (process.env.NODE_ENV === `development`) {
  // Disable logger in production and make it less obnoxious in development
  middlewares.push(createLogger({
    collapsed: (getState, action) => action.type.startsWith("@@redux-form")
  }));
// }

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
);

const store = createStore(
  rootReducer,
  enhancer
);

sagaMiddleware.run(rootSaga);

export default store;
