import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import StructureComponent from './structure'
import VibrationalModesComponent from './vibrational'

export default class CJSONComponent extends React.Component {

  constructor(props) {
    super(props);
    this.onBarClick = this.onBarClick.bind(this);
    this.state = {
        animateMode: this.props.metadata.animateMode,
    }

  }

  onBarClick(data) {
    this.setState({
      animateMode: data.index,
    })
  }

  render() {
    const { data, metadata } = this.props;
    return (
      <div className='oc-cjson'>
        { metadata.structure && <StructureComponent data={this.props.data} metadata={metadata} animateMode={this.state.animateMode}/>
        }
        {'vibrations' in this.props.data && metadata.vibrational &&
          <VibrationalModesComponent data={this.props.data.vibrations} metadata={metadata} onBarClick={this.onBarClick}/>
        }
      </div>
    );
  }
}

function objectIncludes(data, query) {
  return JSON.stringify(data).includes(query);
}
