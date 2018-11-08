import * as React from 'react';
import { Provider } from 'react-redux';
import { IChemJson } from '@openchemistry/types';
import { wc } from '../common/webcomponent';

import {
  JSONValue,
  JSONObject
} from '@phosphor/coreutils';

import store from '../common'

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme();

export interface IProps {
  data: JSONObject;
  metadata?: JSONObject;
}

export interface IState {
  animateMode?: JSONValue;
}


export class CJSONComponent extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.onBarClick = this.onBarClick.bind(this);
    this.state = {
        animateMode: this.props.metadata.animateMode,
    }
  }

  onBarClick(data: JSONObject) {
    this.setState({
      animateMode: data.index,
    })
  }

  render() {
    const { data } = this.props;

    const cjson: IChemJson = data as IChemJson;
    // We use React.createElement(...) here otherwise tsc complains about
    // our custom element.
    const ref = wc(
      // Events
      {},
      // Props
      {
        cjson: cjson
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
