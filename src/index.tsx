import {
  IRenderMime
} from '@jupyterlab/rendermime-interfaces';

import "@babel/polyfill";

import extensionCJSON from './widgets/cjson/';
import extensionCalculationMonitorWidget from './widgets/calculations'
import extensionFreeEnergyWidget from './widgets/energy'

import { defineCustomElements as defineMolecule } from '@openchemistry/molecule';
import { defineCustomElements as defineEnergyPlot } from '@openchemistry/energy-plot/dist/loader';

defineMolecule(window);
defineEnergyPlot(window);

const extensions: IRenderMime.IExtension | IRenderMime.IExtension[] = [
  extensionCJSON,
  extensionCalculationMonitorWidget,
  extensionFreeEnergyWidget
];

export default extensions;
