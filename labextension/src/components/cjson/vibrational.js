import React from 'react';
import ReactDOM from 'react-dom';
import './vibrational.css';

import { VibrationalModesChart } from 'mongochemclient'

export default class VibrationalModesComponent extends React.Component {

  render() {
    return (
      <div className='oc-vibrational'>
        <VibrationalModesChart data={this.props.data} selectedMode={this.props.metadata.animateMode}
                              clickbar={this.props.onBarClick}/>
      </div>
    );
  }
}
