import React from 'react';
import ReactDOM from 'react-dom';
import './vibrational.css';

import { VibrationalModesChart } from 'mongochemclient'

export default class VibrationalModesComponent extends React.Component {

  render() {
    const { data, metadata } = this.props;
    return (
      <div className='oc-vibrational'>
        <VibrationalModesChart data={this.props.data} />
      </div>
    );
  }
}
