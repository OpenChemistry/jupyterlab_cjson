import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { FreeEnergyChart } from 'mongochemclient'

export default class FreeEnergyComponent extends React.Component {

  render() {
    const { data, metadata } = this.props;
    return (
      <div className='oc-free'>
        <FreeEnergyChart data={this.props.data}/>
      </div>
    );
  }
}
