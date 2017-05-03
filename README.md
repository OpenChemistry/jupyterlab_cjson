# jupyterlab_cjson

A JupyterLab and Jupyter Notebook extension for rendering CJSON

![output renderer](http://g.recordit.co/QAsC7YULcY.gif)

## Prerequisites

* JupyterLab ^0.20.0 and/or Notebook >=4.3.0

## Usage

To render CJSON output in IPython:

```python
from jupyterlab_cjson import CJSON

CJSON({
    "string": "string",
    "array": [1, 2, 3],
    "bool": True,
    "object": {
        "foo": "bar"
    }
})
```

To render a `.cjson` file as a tree, simply open it:

![file renderer](http://g.recordit.co/cbf0xnQHKn.gif)

## Install

```bash
# For JupyterLab
jupyter labextension install jupyterlab_cjson
# For Notebook
pip install jupyterlab_cjson
jupyter nbextension install --py --sys-prefix jupyterlab_cjson
jupyter nbextension enable --py --sys-prefix jupyterlab_cjson
```

## Development

```bash
pip install -e .
# For JupyterLab
cd labextension
jupyter labextension link .
# For Notebook
jupyter nbextension install --symlink --py --sys-prefix jupyterlab_cjson
jupyter nbextension enable --py --sys-prefix jupyterlab_cjson
```
