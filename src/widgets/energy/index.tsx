import {
  Widget
} from '@lumino/widgets';

import {
  IRenderMime
} from '@jupyterlab/rendermime-interfaces';

import * as React from 'react';

import * as ReactDOM from 'react-dom';

import FreeEnergyComponent from '../../components/energy';

export const MIME_TYPE = 'application/vnd.oc.free_energy+json';
const CLASS_NAME = 'jp-OutputWidgetFreeEnergy';

export
class FreeEnergyWidget extends Widget implements IRenderMime.IRenderer {
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
      ReactDOM.render(<FreeEnergyComponent {...props} />, this.node, () => {
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
  createRenderer: options => new FreeEnergyWidget(options)
};

const extensionFreeEnergyWidget : IRenderMime.IExtension = {
  id: 'FreeEnergyWidget:plugin',
  rendererFactory,
  rank: 0,
  dataType: 'json',
  documentWidgetFactoryOptions: {
    name: 'FreeEnergyWidget',
    primaryFileType: 'freeenergy',
    fileTypes: ['freeenergy'],
    defaultFor: ['freeenergy']
  }
}

export default extensionFreeEnergyWidget;
