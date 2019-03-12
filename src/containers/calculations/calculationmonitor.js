import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as ocRedux from '@openchemistry/redux/esm';

import CalculationMonitorTable from '../../components/calculations/calculationmonitor';
import { CalculationState } from '../../utils/constants';
import { uniq, isNil } from 'lodash-es';

class CalculationMonitorTableContainer extends React.Component {

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

    if (this.isComplete() && !isNil(this.props.completeTitle)) {
      props['title'] = this.props.completeTitle;
    }

    return (
      <CalculationMonitorTable {...props} />
    );
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
