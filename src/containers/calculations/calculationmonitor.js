import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as ocRedux from '@openchemistry/redux/esm';

import CalculationMonitorTable from '../../components/calculations/calculationmonitor';
import CalculationLog from './calculationlog';
import { CalculationState } from '../../utils/constants';
import { uniq, isNil } from 'lodash-es';

class CalculationMonitorTableContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'monitor',
      selected: ''
    }

    this.onLogView = (taskFlowId) => {
      this.props.dispatch(ocRedux.cumulus.observeTaskFlow(taskFlowId, true));
      this.setState(state => {
        state.view = 'logs';
        state.selected = taskFlowId;
        return state;
      });
    }

    this.onMonitorView = (taskFlowId) => {
      this.props.dispatch(ocRedux.cumulus.observeTaskFlow(taskFlowId, false));
      this.setState(state => {
        state.view = 'monitor';
        state.selected = '';
        return state;
      });
    };
  }

  componentDidMount() {
    if (this.props.taskFlowIds != null) {
      for (const id of this.props.taskFlowIds) {
        setTimeout(() => {
          this.props.dispatch(ocRedux.cumulus.loadTaskFlow({id}));
        }, 500);
      }
    }
  }

  isComplete() {
    let states = this.props.calculations.map((calculation) => calculation.status);
    states = uniq(states)

    return (states.length === 1) && (states[0] === CalculationState.complete.name);
  }

  render() {

    const props = {
      calculations: this.props.calculations,
    }

    const { view, selected } = this.state;

    if (view === 'monitor') {
      if (this.isComplete() && !isNil(this.props.completeTitle)) {
        props['title'] = this.props.completeTitle;
      }
      return (
        <CalculationMonitorTable {...props} onSelect={this.onLogView}/>
      );
    } else if (view === 'logs') {
      return (
        <CalculationLog taskFlowId={selected} onBack={this.onMonitorView} />
      )
    } else {
      return null;
    }
  }
}

// CalculationMonitorTableContainer.propTypes = {
//     taskFlowIds: PropTypes.array,
//     completeTitle: PropTypes.string,
// }

CalculationMonitorTableContainer.defaultProps = {
    taskFlowIds: [],
    completeTitle: '',
}

function mapStateToProps(state, ownProps) {

  const calculations = []
  for (const taskFlowId of ownProps.taskFlowIds) {
    const calculation = {
        name: taskFlowId,
        code: ocRedux.selectors.cumulus.getCalculationCode(state, taskFlowId),
        status: ocRedux.selectors.cumulus.getCalculationStatus(state, taskFlowId)
    }
    calculations.push(calculation);
  }

  return {
    calculations,
  }
}

export default connect(mapStateToProps)(CalculationMonitorTableContainer)
