import {
  IRenderMime
} from '@jupyterlab/rendermime-interfaces';

import "@babel/polyfill";

import extensionCJSON from './widgets/cjson/';
import extensionCalculationMonitorWidget from './widgets/calculations'
import extensionFreeEnergyWidget from './widgets/energy'

import { defineCustomElements as defineMolecule } from '@openchemistry/molecule/loader';
import { defineCustomElements as defineEnergyPlot } from '@openchemistry/energy-plot/loader';

defineMolecule(window);
defineEnergyPlot(window);

const extensions: IRenderMime.IExtension | IRenderMime.IExtension[] = [
  extensionCJSON,
  extensionCalculationMonitorWidget,
  extensionFreeEnergyWidget
];

export default extensions;
