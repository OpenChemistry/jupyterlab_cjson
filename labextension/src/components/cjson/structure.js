import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { CalculationContainer } from 'mongochemclient'


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
        <CalculationContainer
          cjson={data}
          isoSurfaces={metadata.isoSurfaces}
          id={metadata.calculationId}
          orbital={metadata.mo}
          animateMode={animateMode} animation={animation} />
    );
  }
}
