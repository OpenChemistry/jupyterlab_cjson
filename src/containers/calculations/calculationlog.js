import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as ocRedux from '@openchemistry/redux/esm';

import CalculationLog from '../../components/calculations/calculationlog';

class CalculationLogContainer extends Component {

  render() {
    return (
      <CalculationLog {...this.props} />
    );
  }
}

CalculationLogContainer.propTypes = {
  taskFlowId: PropTypes.string,
  taskFlow: PropTypes.object
}

CalculationLogContainer.defaultProps = {
  taskFlowId: '',
  taskFlow: null,
}

function mapStateToProps(state, ownProps) {

  const { taskFlowId } = ownProps;
  const taskFlow = ocRedux.selectors.cumulus.getTaskFlow(state, taskFlowId);

  return {
    taskFlow,
  }
}

export default connect(mapStateToProps)(CalculationLogContainer);
