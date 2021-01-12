import {
  Widget
} from '@lumino/widgets';

import {
  IRenderMime
} from '@jupyterlab/rendermime-interfaces';

import * as React from 'react';

import * as ReactDOM from 'react-dom';

import CalculationMonitorComponent from '../../components/calculations';


export const MIME_TYPE = 'application/vnd.oc.calculation+json';
const CLASS_NAME = 'jp-OutputWidgetCalculationMonitor';

export
class CalculationMonitorWidget extends Widget implements IRenderMime.IRenderer {
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this.addClass(CLASS_NAME);
    this._mimeType = options.mimeType;
  }

  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    const data = model.data[this._mimeType] as any;
    const metadata = model.metadata[this._mimeType] as any || {};
    const props = { data, metadata };
    return new Promise<void>((resolve, reject) => {
      ReactDOM.render(<CalculationMonitorComponent {...props} />, this.node, () => {
        resolve(undefined);
      });
    });
  }

  private _mimeType: string;
}

export
const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIME_TYPE],
  createRenderer: options => new CalculationMonitorWidget(options)
};

const extensionCalculationMonitorWidget : IRenderMime.IExtension = {
  id: 'CalculationMonitorWidget:plugin',
  rendererFactory,
  rank: 0,
  dataType: 'json',
  documentWidgetFactoryOptions: {
    name: 'CalculationMonitorWidget',
    primaryFileType: 'calculations',
    fileTypes: ['calculations'],
    defaultFor: ['calculations']
  }
}

export default extensionCalculationMonitorWidget;
