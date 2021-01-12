import * as React from 'react';
import { Provider } from 'react-redux';
import {
  JSONObject
} from '@lumino/coreutils';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import './index.css';
import store from '../common';

import { auth,  girderClient } from '@openchemistry/girder-redux';
import  CalculationMonitorTableContainer from '../../containers/calculations/calculationmonitor';

const theme = createMuiTheme();

export interface IProps {
  data: JSONObject;
  metadata?: JSONObject;
}

export default class CalculationMonitorComponent extends React.Component<IProps> {
  render() {
    const data = this.props.data;

    // Update the girder token from the notebook
    if ('girderToken' in data) {
      const girderToken = data['girderToken'];
      const girderApiUrl = data['girderApiUrl'];
      girderClient().setBaseURL(girderApiUrl);
      store.dispatch(auth.actions.authenticate({
          token: girderToken,
          redirect: false}));
    }

    return (
     <div>
        <MuiThemeProvider theme={theme}>
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
