import {
  IRenderMime
} from '@jupyterlab/rendermime-interfaces';

import extensionCJSON from './widgets/cjson/';


const extensions: IRenderMime.IExtension | IRenderMime.IExtension[] = [
  extensionCJSON
];

export default extensions;
