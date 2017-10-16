import {
  JupyterLabPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  ServerConnection
} from '@jupyterlab/services';

import {
  Widget
} from '@phosphor/widgets';

import '../style/index.css';


/**
 * Initialization data for the jupyterlab_xkcd extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_xkcd',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app, palette: ICommandPalette) => {
    console.log('JupyterLab extension jupyterlab_xkcd is activated!');

    // Create a single widget
    let widget: Widget = new Widget();
    widget.id = 'xkcd-jupyterlab';
    widget.title.label = 'xkcd.com';
    widget.title.closable = true;

    // Add an image element to the panel
    let img = document.createElement('img');
    widget.node.appendChild(img);

    // Fetch info about a random comic
    let settings = ServerConnection.makeSettings();
    ServerConnection.makeRequest({url: 'https:////egszlpbmle.execute-api.us-east-1.amazonaws.com/prod'}, settings).then(response => {
      img.src = response.data.img;
      img.alt = response.data.title;
      img.title = response.data.alt;
    });

    // Add an application command
    const command: string = 'xkcd:open';
    app.commands.addCommand(command, {
      label: 'Random xkcd comic',
      execute: () => {
        if (!widget.isAttached) {
          // Attach the widget to the main area if it's not there
          app.shell.addToMainArea(widget);
        }
        // Activate the widget
        app.shell.activateById(widget.id);
      }
    });

    // Add the command to the palette.
    palette.addItem({command, category: 'Tutorial'});
  }
};

export default extension;
