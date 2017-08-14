import { IRenderMime } from '@jupyterlab/rendermime';
import { IDocumentRegistry } from '@jupyterlab/docregistry';
import { ILayoutRestorer, InstanceTracker } from '@jupyterlab/apputils';
import { toArray, ArrayExt } from '@phosphor/algorithm';
import { CjsonOutputRenderer } from './widgets/cjson/output';
import { CjsonDocWidgetFactory } from './widgets/cjson/doc';
import { FreeEnergyOutputRenderer } from './widgets/energy/output';
import { FreeEnergyDocWidgetFactory } from './widgets/energy/doc';
import { CalculationMonitorOutputRenderer } from './widgets/calculations/output';
import { CalculationMonitorDocWidgetFactory } from './widgets/calculations/doc';

import '../index.css';

/**
 * The name of the factory
 */
const CJSON_FACTORY = 'CJSON';
const FREE_FACTORY = 'FREE_ENERGY';

/**
 * Set the extensions associated with application/cjson
 */
const CJSON_EXTENSIONS = ['.cjson'];
const CJSON_DEFAULT_EXTENSIONS = ['.cjson'];
const FREE_ENERGY_EXTENSIONS = ['.cjson-free_energy'];
const FREE_ENERGY_DEFAULT_EXTENSIONS = ['.cjson-free_energy'];
const CALCULATION_EXTENSIONS = ['.calculation'];
const CALCULATION_DEFAULT_EXTENSIONS = ['.calculation'];


function activateCJSON(app, rendermime, registry, restorer, index) {
  /**
   * Add output renderer for application/cjson data
   */
  rendermime.addRenderer(
    {
      mimeType: 'application/cjson',
      renderer: new CjsonOutputRenderer()
    },
    index
  );

  const cjsonFactory = new CjsonDocWidgetFactory({
    fileExtensions: CJSON_EXTENSIONS,
    defaultFor: CJSON_DEFAULT_EXTENSIONS,
    name: CJSON_FACTORY
  });


  /**
   * Add document renderer for files
   */
  registry.addWidgetFactory(cjsonFactory);

  const tracker = new InstanceTracker({
    namespace: 'CJSON',
    shell: app.shell
  });

  /**
   * Handle widget state deserialization
   */
  restorer.restore(tracker, {
    command: 'file-operations:open',
    args: widget => ({ path: widget.context.path, factory: CJSON_FACTORY }),
    name: widget => widget.context.path
  });

  /**
   * Serialize widget state
   */
  cjsonFactory.widgetCreated.connect((sender, widget) => {
    tracker.add(widget);
    /* Notify the instance tracker if restore data needs to update */
    widget.context.pathChanged.connect(() => {
      tracker.save(widget);
    });
  });
}

function activateFreeEnergy(app, rendermime, registry, restorer, index) {
  /**
   * Add output renderer for application/cjson data
   */
  rendermime.addRenderer(
    {
      mimeType: 'application/cjson-free_energy',
      renderer: new FreeEnergyOutputRenderer()
    },
    index
  );

  const freeFactory = new FreeEnergyDocWidgetFactory({
    fileExtensions: FREE_ENERGY_EXTENSIONS,
    defaultFor: FREE_ENERGY_DEFAULT_EXTENSIONS,
    name: FREE_FACTORY
  });


  /**
   * Add document renderer for files
   */
  registry.addWidgetFactory(freeFactory);

  const tracker = new InstanceTracker({
    namespace: 'FreeEnergy',
    shell: app.shell
  });

  /**
   * Handle widget state deserialization
   */
  restorer.restore(tracker, {
    command: 'file-operations:open',
    args: widget => ({ path: widget.context.path, factory: FREE_FACTORY }),
    name: widget => widget.context.path
  });

  /**
   * Serialize widget state
   */
  freeFactory.widgetCreated.connect((sender, widget) => {
    tracker.add(widget);
    /* Notify the instance tracker if restore data needs to update */
    widget.context.pathChanged.connect(() => {
      tracker.save(widget);
    });
  });
}

function activateCalculationMontor(app, rendermime, registry, restorer, index) {
  /**
   * Add output renderer
   */
  rendermime.addRenderer(
    {
      mimeType: 'application/calculation',
      renderer: new CalculationMonitorOutputRenderer()
    },
    index
  );

  const calculationFactory = new CalculationMonitorDocWidgetFactory({
    fileExtensions: CALCULATION_EXTENSIONS,
    defaultFor: CALCULATION_DEFAULT_EXTENSIONS,
    name: CALCULATION_FACTORY
  });


  // Not sure we need this
  /**
   * Add document renderer for files
   */
  registry.addWidgetFactory(calculationFactory);

  const tracker = new InstanceTracker({
    namespace: 'CalculationMonitor',
    shell: app.shell
  });

  /**
   * Handle widget state deserialization
   */
  restorer.restore(tracker, {
    command: 'file-operations:open',
    args: widget => ({ path: widget.context.path, factory: CALCULATION_FACTORY }),
    name: widget => widget.context.path
  });

  /**
   * Serialize widget state
   */
  calculationFactory.widgetCreated.connect((sender, widget) => {
    tracker.add(widget);
    /* Notify the instance tracker if restore data needs to update */
    widget.context.pathChanged.connect(() => {
      tracker.save(widget);
    });
  });
}



/**
 * Activate the extension.
 */
function activatePlugin(app, rendermime, registry, restorer) {
  /**
   * Calculate the index of the renderer in the array renderers
   * e.g. Insert this renderer after any renderers with mime type that matches
   * "+json"
   */
  // const index = ArrayExt.findLastIndex(
  //   toArray(rendermime.mimeTypes()),
  //   mime => mime.endsWith('+json')
  // ) + 1;
  /* ...or just insert it at the top */
  let index = 0;

  activateCJSON(app, rendermime, registry, restorer, index);
  index++;
  activateFreeEnergy(app, rendermime, registry, restorer, index);
  index++;
  activateCalculationMontor(app, rendermime, registry, restorer, index);
}

/**
 * Configure jupyterlab plugin
 */
const Plugin = {
  id: 'jupyter.extensions.CJSON',
  requires: [IRenderMime, IDocumentRegistry, ILayoutRestorer],
  activate: activatePlugin,
  autoStart: true
};

export default Plugin;
