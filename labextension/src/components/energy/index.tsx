import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

import { FreeEnergyChart } from 'mongochemclient'

export interface IProps {
  data: JSONObject;
  metadata?: JSONObject;
}

export default class FreeEnergyComponent extends React.Component<IProps> {

  render() {
    const { data, metadata } = this.props;
    return (
      <div className='oc-free'>
        <FreeEnergyChart data={this.props.data}/>
      </div>
    );
  }
}
