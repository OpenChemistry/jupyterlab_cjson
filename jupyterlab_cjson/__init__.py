from IPython.display import display, JSON

# Running `npm run build` will create static resources in the static
# directory of this Python package (and create that directory if necessary).

def _jupyter_labextension_paths():
    return [{
        'name': 'jupyterlab_cjson',
        'src': 'static',
    }]

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyterlab_cjson',
        'require': 'jupyterlab_cjson/extension'
    }]

# A display class that can be used within a notebook.
#   from jupyterlab_cjson import CJSON
#   CJSON(data)

DEFAULT_ISO = 43 / 2000.0;
DEFAULT_ISO_SURFACES = [{
    'value': DEFAULT_ISO,
    'color': 'blue',
    'opacity': 0.9,
  }, {
    'value': -DEFAULT_ISO,
    'color': 'red',
    'opacity': 0.9
  }];

class CJSON(JSON):
    """A display class for displaying CJSON visualizations in the Jupyter Notebook and IPython kernel.

    CJSON expects a JSON-able dict, not serialized JSON strings.

    Scalar types (None, number, string) are not allowed, only dict containers.
    """



    def __init__(self, data=None, url=None, filename=None, vibrational=True, structure=True, iso_surfaces=DEFAULT_ISO_SURFACES):
        super(CJSON, self).__init__(data, url, filename)
        self.metadata['vibrational'] = vibrational
        self.metadata['structure'] = structure
        self.metadata['isoSurfaces'] = iso_surfaces

    def _ipython_display_(self):
        bundle = {
            'application/cjson': self.data,
            'text/plain': '<jupyterlab_cjson.CJSON object>'
        }
        metadata = {
            'application/cjson': self.metadata
        }
        display(bundle, metadata=metadata, raw=True)

class FreeEnergy(JSON):
    """A display class for displaying free energy visualizations in the Jupyter Notebook and IPython kernel.

    FreeEnergy expects a JSON-able dict.

    """

    def __init__(self, data=None, url=None, filename=None):
        super(FreeEnergy, self).__init__(data, url, filename)

    def _ipython_display_(self):
        bundle = {
            'application/cjson-free_energy': self.data,
            'text/plain': '<jupyterlab_cjson.FreeEnergy object>'
        }
        metadata = {
            'application/cjson-free_energy': self.metadata
        }
        display(bundle, metadata=metadata, raw=True)
