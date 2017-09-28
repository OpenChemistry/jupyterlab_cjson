import {
  IRenderMime
} from '@jupyterlab/rendermime-interfaces';

import extensionCJSON from './widgets/cjson/';
import extensionCalculationMonitorWidget from './widgets/calculations'
import extensionFreeEnergyWidget from './widgets/energy'

const extensions: IRenderMime.IExtension | IRenderMime.IExtension[] = [
  extensionCJSON,
  extensionCalculationMonitorWidget,
  extensionFreeEnergyWidget
];

export default extensions;
