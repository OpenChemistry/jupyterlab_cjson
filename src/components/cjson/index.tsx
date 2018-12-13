import * as React from 'react';
import { Provider } from 'react-redux';
import { IChemJson } from '@openchemistry/types';
import { wc } from '../common/webcomponent';

import store from '../common'

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme();

export interface IProps {
  data: IChemJson;
  metadata: {
    moleculeRenderer: string;
    showSpectrum: boolean;
    showVolume: boolean;
    showIsoSurface: boolean;
    showMenu: boolean;
    iOrbital: number | string;
    isoValue: number;
    iMode: number;
    play: boolean;
  };
}

export interface IState {
}


export class CJSONComponent extends React.Component<IProps, IState> {

  render() {
    const { data, metadata } = this.props;

    // We use React.createElement(...) here otherwise tsc complains about
    // our custom element.
    const ref = wc(
      // Events
      {},
      // Props
      {
        cjson: data,
        ...metadata
      }
    );
    const molecule = React.createElement('oc-molecule', {
      ref
    });

    return (
     <div>
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <div style={{width: '100%', height: '40rem'}}>
              {molecule}
            </div>
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}
