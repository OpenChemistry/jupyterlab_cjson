import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import StructureComponent from './structure'
import VibrationalModesComponent from './vibrational'

export default class CJSONComponent extends React.Component {

  render() {
    const { data, metadata } = this.props;
    return (
      <div className='oc-cjson'>
        { metadata.structure && <StructureComponent data={this.props.data} />
        }
        {'vibrations' in this.props.data && metadata.vibrational &&
          <VibrationalModesComponent data={this.props.data.vibrations} />
        }
      </div>
    );
  }
}

function objectIncludes(data, query) {
  return JSON.stringify(data).includes(query);
}
