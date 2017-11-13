import {
  Widget
} from '@phosphor/widgets';

import {
  IRenderMime
} from '@jupyterlab/rendermime-interfaces';

import * as React from 'react';

import * as ReactDOM from 'react-dom';

import {
  CJSONComponent
} from '../../components/cjson';


export const MIME_TYPE = 'application/cjson+json';

const CLASS_NAME = 'jp-OutputWidgetCJSON';

export
class RenderedCJSON extends Widget implements IRenderMime.IRenderer {
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
      ReactDOM.render(<CJSONComponent {...props} />, this.node, () => {
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
  createRenderer: options => new RenderedCJSON(options)
};

const extensionCJSON : IRenderMime.IExtension = {
  id: 'CJSON:plugin',
  rendererFactory,
  rank: 0,
  dataType: 'json',
  documentWidgetFactoryOptions: {
    name: 'CJSON',
    primaryFileType: 'cjson',
    fileTypes: ['cjson'],
    defaultFor: ['cjson']
  }
}

export default extensionCJSON;
