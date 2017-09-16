# jupyterlab_xkcd

Show a random xkcd.com comic in a JupyterLab panel

![Screenshot of the extension in JupyterLab](screenshot.png)

## Why?

This project is reference material for the *Let's Make an xkcd JupyterLab Extension*
tutorial currently proposed in [jupyterlab/jupyterlab#2921](https://github.com/jupyterlab/jupyterlab/pull/2921/).

## Prerequisites

* JupyterLab

## Installation

```bash
jupyter labextension install @jupyterlab/xkcd-extension
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```

