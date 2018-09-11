import rootSaga from '@openchemistry/sagas';
import configureStore from './store';
// import { rootSaga, configureStore } from 'mongochemclient'
// import * as injectTapEventPlugin from 'react-tap-event-plugin';

export const store = configureStore()
store.runSaga(rootSaga)

//Needed for onTouchTap
//http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

