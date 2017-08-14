import { Widget } from '@phosphor/widgets';
import { ABCWidgetFactory } from '@jupyterlab/docregistry';
import { ActivityMonitor } from '@jupyterlab/coreutils';
import { runMode } from '@jupyterlab/codemirror';
import React from 'react';
import ReactDOM from 'react-dom';
import CJSONComponent from '../../components/cjson';

const CLASS_NAME = 'jp-DocWidgetCalculationMonitor';
const RENDER_TIMEOUT = 1000;

/**
 * A widget for rendering calculation results
 */
export class CalculationMonitorDocWidget extends Widget {
  constructor(context) {
    super();
    this._context = context;
    this._onPathChanged();
    this.addClass(CLASS_NAME);
    context.ready.then(() => {
      this.update();
      /* Re-render when the document content changes */
      context.model.contentChanged.connect(this.update, this);
      /* Re-render when the document path changes */
      context.fileChanged.connect(this.update, this);
    });
    /* Update title when path changes */
    context.pathChanged.connect(this._onPathChanged, this);
    /* Throttle re-renders until changes have stopped */
    this._monitor = new ActivityMonitor({
      signal: context.model.contentChanged,
      timeout: RENDER_TIMEOUT
    });
    this._monitor.activityStopped.connect(this.update, this);
  }

  /**
   * The widget's context
   */
  get context() {
    return this._context;
  }

  /**
   * Dispose of the resources used by the widget
   */
  dispose() {
    if (!this.isDisposed) {
      this._context = null;
      this._monitor.dispose();
      super.dispose();
    }
  }

  /**
   * A message handler invoked on an `'after-attach'` message
   */
  onAfterAttach(msg) {
    /* Render initial data */
    this.update();
  }

  /**
   * A message handler invoked on an `'before-detach'` message
   */
  onBeforeDetach(msg) {
    /* Dispose of resources used by  widget */
    // renderLibrary.dispose(this.node);
  }

  /**
   * A message handler invoked on a `'resize'` message
   */
  onResize(msg) {
    /* Re-render on resize */
    this.update();
  }

  /**
   * A message handler invoked on an `'update-request'` message
   */
  onUpdateRequest(msg) {
    if (this.isAttached && this._context.isReady) this._render();
  }

  /**
   * Render data to DOM node
   */
  _render() {
    const content = this._context.model.toString();
    try {
      const props = {
        data: JSON.parse(content),
        theme: 'cm-s-jupyter'
      };
      ReactDOM.render(<CalculationMonitorComponent {...props} />, this.node);
    } catch (error) {
      ReactDOM.render(
        <ErrorDisplay message="Invalid calcultion information" content={content} />,
        this.node
      );
    }
  }

  /**
   * A message handler invoked on a `'path-changed'` message
   */
  _onPathChanged() {
    this.title.label = this._context.path.split('/').pop();
  }
}

/**
 * A widget factory for DocWidget
 */
export class CalculationMonitorDocWidgetFactory extends ABCWidgetFactory {
  /**
    * Create a new widget instance
    */
  createNewWidget(context) {
    return new CalculationMonitorDocWidget(context);
  }
}
