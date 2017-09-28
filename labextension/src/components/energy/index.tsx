import * as React from 'react';
import {
  JSONObject
} from '@phosphor/coreutils';

import './index.css';
import { FreeEnergyChart } from 'mongochemclient'

export interface IProps {
  data: JSONObject;
  metadata?: JSONObject;
}

export default class FreeEnergyComponent extends React.Component<IProps> {

  render() {
    const data= this.props.data;
    return (
      <div className='oc-free'>
        <FreeEnergyChart data={data}/>
      </div>
    );
  }
}
