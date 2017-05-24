import { IRenderMime } from '@jupyterlab/rendermime';
import { IDocumentRegistry } from '@jupyterlab/docregistry';
import { ILayoutRestorer, InstanceTracker } from '@jupyterlab/apputils';
import { toArray, ArrayExt } from '@phosphor/algorithm';
import { CjsonOutputRenderer } from './widgets/cjson/output';
import { CjsonDocWidgetFactory } from './widgets/cjson/doc';

import '../index.css';

/**
 * The name of the factory
 */
const CJSON_FACTORY = 'CJSON';

/**
 * Set the extensions associated with application/cjson
 */
const CJSON_EXTENSIONS = ['.cjson'];
const CJSON_DEFAULT_EXTENSIONS = ['.cjson'];


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
  const index = 0;

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
    args: widget => ({ path: widget.context.path, factory: FACTORY }),
    name: widget => widget.context.path
  });

  /**
   * Serialize widget state
   */
  factory.widgetCreated.connect((sender, widget) => {
    tracker.add(widget);
    /* Notify the instance tracker if restore data needs to update */
    widget.context.pathChanged.connect(() => {
      tracker.save(widget);
    });
  });
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
