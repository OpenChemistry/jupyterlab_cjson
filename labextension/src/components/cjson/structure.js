import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Molecule } from 'mongochemclient'

export default class StructureComponent extends React.Component {

  render() {
    let animation = null;
    const { data, metadata, animateMode } = this.props;

    if (animateMode) {
      animation = {
          amplitude: 1,
      }
    }

    return (
        <Molecule cjson={data} isoSurfaces={metadata.isoSurfaces}
                  animateMode={animateMode} animation={animation} />
    );
  }
}
