import * as React from 'react';
import {
  JSONValue,
  JSONObject
} from '@phosphor/coreutils';

import './index.css';

// import { CalculationContainer } from 'mongochemclient'

export interface IProps {
  data: JSONObject;
  metadata?: JSONObject;
  animateMode?: JSONValue;
}

export default class StructureComponent extends React.Component<IProps> {

  render() {
    // let animation = null;
    // const { data, metadata, animateMode } = this.props;

    // if (animateMode) {
    //   animation = {
    //       amplitude: 1,
    //   }
    // }

    return (
        <p>CalculationContainer</p>
        // <CalculationContainer
        //   cjson={data}
        //   isoSurfaces={metadata.isoSurfaces}
        //   id={metadata.calculationId}
        //   orbital={metadata.mo}
        //   animateMode={animateMode} animation={animation}
        //   showNotebooks={false} />
    );
  }
}
