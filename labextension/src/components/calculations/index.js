import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import {store} from '../common'
import { CalculationMonitorTableContainer,
         newToken,
         connectToNotificationStream
} from 'mongochemclient'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

connectToNotificationStream(store);

export default class CalculationMonitorComponent extends React.Component {

  render() {
    const { data, metadata } = this.props;

    // Update the girder token from the notebook
    if ('girderToken' in data) {
      store.dispatch(newToken(data['girderToken']));
    }

    return (
     <div>
        <MuiThemeProvider>
          <Provider store={store}>
          <div>
            <CalculationMonitorTableContainer taskFlowIds={data.taskFlowIds} completeTitle={'Calculation(s) are complete. Please re-execute cell to view results.'} />
          </div>
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}
