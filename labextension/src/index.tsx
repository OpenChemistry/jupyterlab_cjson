import {
  IRenderMime
} from '@jupyterlab/rendermime-interfaces';

import extensionCJSON from './widgets/cjson/';
import extensionCalculationMonitorWidget from './widgets/calculations'
import extensionFreeEnergyWidget from './widgets/energy'

import * as Molecule from  '@openchemistry/molecule';
import * as EnergyPlot from '@openchemistry/energy-plot';

Molecule.defineCustomElements(window);
EnergyPlot.defineCustomElements(window);

const extensions: IRenderMime.IExtension | IRenderMime.IExtension[] = [
  extensionCJSON,
  extensionCalculationMonitorWidget,
  extensionFreeEnergyWidget
];

export default extensions;
