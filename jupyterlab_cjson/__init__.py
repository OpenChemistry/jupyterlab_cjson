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
    
class CJSON(JSON):
    """A display class for displaying CJSON visualizations in the Jupyter Notebook and IPython kernel.
    
    CJSON expects a JSON-able dict, not serialized JSON strings.

    Scalar types (None, number, string) are not allowed, only dict containers.
    """

    def _ipython_display_(self):
        bundle = {
            'application/cjson': self.data,
            'text/plain': '<jupyterlab_cjson.CJSON object>'
        }
        metadata = {
            'application/cjson': self.metadata
        }
        display(bundle, metadata=metadata, raw=True) 
