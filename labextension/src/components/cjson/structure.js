import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Molecule } from 'mongochemclient'

export default class StructureComponent extends React.Component {

  render() {
    const { data, metadata } = this.props;
    return (
        <Molecule cjson={data} isoSurfaces={metadata.isoSurfaces} />
    );
  }
}
