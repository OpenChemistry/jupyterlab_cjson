import {
  IRenderMime
} from '@jupyterlab/rendermime-interfaces';

import extensionCJSON from './widgets/cjson/';
import extensionCalculationMonitorWidget from './widgets/calculations'


const extensions: IRenderMime.IExtension | IRenderMime.IExtension[] = [
  extensionCJSON,
  extensionCalculationMonitorWidget
];

export default extensions;
