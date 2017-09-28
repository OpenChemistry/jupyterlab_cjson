import * as React from 'react';
import { Provider } from 'react-redux';
import './index.css';
import {
  JSONValue,
  JSONObject
} from '@phosphor/coreutils';

import StructureComponent from './structure'
import VibrationalModesComponent from './vibrational'
import {store} from '../common'
import * as _ from 'lodash'

import {MuiThemeProvider} from "material-ui/styles";


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
    const { data, metadata } = this.props;

    return (
     <div>
        <MuiThemeProvider>
          <Provider store={store}>
          <div className='oc-cjson'>
            { metadata.structure && <StructureComponent data={data} metadata={metadata} animateMode={this.state.animateMode}/>
            }
            { _.has(this.props.data, 'vibrations')  && metadata.vibrational &&
              <VibrationalModesComponent data={this.props.data.vibrations} metadata={metadata} onBarClick={this.onBarClick}/>
            }
          </div>
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}
