import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Molecule from 'mongochemclient'

const theme = {
  scheme: 'jupyter',
  base00: '#fff',
  base01: '#fff',
  base02: '#d7d4f0',
  base03: '#408080',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#d7d4f0',
  base07: '#fff',
  base08: '#000',
  base09: '#080',
  base0A: '#fba922',
  base0B: '#408080',
  base0C: '#aa22ff',
  base0D: '#00f',
  base0E: '#008000',
  base0F: '#00f'
};

export default class CJSONComponent extends React.Component {
  state = { filter: '' };
  input = null;
  timer = null;

  componentDidMount() {
    /**
     * Stop propagation of keyboard events to JupyterLab
     */
    ReactDOM.findDOMNode(this.input).addEventListener(
      'keydown',
      event => {
        event.stopPropagation();
      },
      false
    );
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this.input).removeEventListener(
      'keydown',
      event => {
        event.stopPropagation();
      },
      false
    );
  }

  render() {
    const { data, metadata } = this.props;
    const keyPaths = this.state.filter
      ? filterPaths(data, this.state.filter)
      : ['root'];
    return (
      <div style={{
        position: 'relative',
        width: '100%'
      }}>
        <Molecule cjson={this.props.data} />
      </div>
    );
  }
}

function objectIncludes(data, query) {
  return JSON.stringify(data).includes(query);
}
