import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles, Fab } from '@material-ui/core';
import Close from '@material-ui/icons/Close';

import { CalculationState } from '../../utils/constants';

const styles = (theme) => ({
  container: {
    position: 'relative',
    backgroundColor: '#002b36',
    height: '20rem',
    color: '#839496',
    padding: '0.5rem',
    overflowY: 'scroll'
  },
  closeButton: {
    position: 'absolute',
    right: '0.5rem',
    top: '0.5rem'
  },
  message: {
    whiteSpace: 'pre-wrap',
    marginBottom: '0.25rem'
  },
  spinner: {
    border: '0.25rem solid #002b36',
    borderTop: '0.25rem solid #839496',
    borderRadius: '50%',
    width: '1rem',
    height: '1rem',
    animation: 'spin 2s linear infinite'
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  }
});

class CalculationLog extends Component {
  render() {
    const { taskFlow, taskFlowId, classes, onBack } = this.props;
    const status = taskFlow && taskFlow.status ? taskFlow.status : CalculationState.initializing.name;

    let spinner;
    switch (status) {
      case CalculationState.complete.name: {
        spinner = <pre>Done!</pre>;
        break;
      }

      case CalculationState.error.name:
      case CalculationState.unexpectederror.name: {
        spinner = <pre>Error!</pre>;
        break;
      }

      default: {
        spinner = <div className={classes.spinner}></div>;
        break;
      }
    }

    let logs = taskFlow ? taskFlow.log : [];
    logs = logs.map((log, i) => (
      <pre className={classes.message} key={i}>{log.msg}</pre>
    ));

    return (
      <Fragment>
        <div className={classes.container}>
          <div className={classes.closeButton}>
            <Fab size="small" onClick={() => {onBack(taskFlowId)}}>
              <Close/>
            </Fab>
          </div>
          {logs}
          {spinner}
        </div>
      </Fragment>
    );
  }
}

CalculationLog.propTypes = {
  taskFlow: PropTypes.object
}

CalculationLog.defaultProps = {
  taskFlow: null
}

export default withStyles(styles)(CalculationLog);
