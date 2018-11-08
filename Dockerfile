# Note: This image is really only use to allow the jupyterlab image rebuild to be
# triggered when this repo is updated. We are using docker hubs "Repository Links".
FROM python:3.6-slim

COPY ./ /jupyterlab_cjson

RUN cd /jupyterlab_cjson && \
  pip install .
