import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import StructureComponent from './structure'
import VibrationalModesComponent from './vibrational'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

//Needed for onTouchTap
//http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


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
     <div>
        <MuiThemeProvider>
          <div className='oc-cjson'>
            { metadata.structure && <StructureComponent data={this.props.data} metadata={metadata} animateMode={this.state.animateMode}/>
            }
            {'vibrations' in this.props.data && metadata.vibrational &&
              <VibrationalModesComponent data={this.props.data.vibrations} metadata={metadata} onBarClick={this.onBarClick}/>
            }
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function objectIncludes(data, query) {
  return JSON.stringify(data).includes(query);
}
