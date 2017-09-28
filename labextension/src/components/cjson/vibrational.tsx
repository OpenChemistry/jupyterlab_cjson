import * as React from 'react';
import {
  JSONValue,
  JSONObject
} from '@phosphor/coreutils';

import './vibrational.css';
import { VibrationalModesChart } from 'mongochemclient'

export interface IProps {
  data: JSONValue;
  metadata?: JSONObject;
  onBarClick?: (data: JSONObject) => void;
}

export default class VibrationalModesComponent extends React.Component<IProps> {

  render() {
    return (
      <div className='oc-vibrational'>
        <VibrationalModesChart data={this.props.data} selectedMode={this.props.metadata.animateMode}
                              clickbar={this.props.onBarClick}/>
      </div>
    );
  }
}
