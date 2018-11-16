import { reducers as ocReducers } from '@openchemistry/redux';
import { auth } from '@openchemistry/girder-redux';

const reducers = {
  molecules: ocReducers.molecules,
  calculations: ocReducers.calculations,
  girder: ocReducers.girder,
  app: ocReducers.app,
  cumulus: ocReducers.cumulus,
  jupyterlab: ocReducers.jupyterlab,
  auth: auth.reducer
};

export default reducers;
