import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import {store} from '../common'
import { CalculationMonitorTableContainer } from 'mongochemclient'


export interface IProps {
  data: JSONObject;
  metadata?: JSONObject;
}

export default class CalculationMonitorComponent extends React.Component<IProps> {
  render() {
    const { data, metadata } = this.props;

    // Update the girder token from the notebook
    if ('girderToken' in data) {
      const girderToken = data['girderToken'];
      store.dispatch(authenticate(girderToken, false));
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
