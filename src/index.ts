import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  ServerConnection
} from '@jupyterlab/services';

import {
  Message
} from '@phosphor/messaging';

import {
  Widget
} from '@phosphor/widgets';

import '../style/index.css';


/**
 * An xckd comic viewer.
 */
class XkcdWidget extends Widget {
  /**
   * Construct a new xkcd widget.
   */
  constructor() {
    super();
    this.settings = ServerConnection.makeSettings();

    this.id = 'xkcd-jupyterlab';
    this.title.label = 'xkcd.com';
    this.title.closable = true;
    this.addClass('jp-xkcdWidget');

    this.img = document.createElement('img');
    this.img.className = 'jp-xkcdCartoon';
    this.node.appendChild(this.img);

    this.img.insertAdjacentHTML('afterend',
      `<div class="jp-xkcdAttribution">
        <a href="https://creativecommons.org/licenses/by-nc/2.5/" class="jp-xkcdAttribution" target="_blank">
          <img src="https://licensebuttons.net/l/by-nc/2.5/80x15.png" />
        </a>
      </div>`
    );
  }

  /**
   * The server settings associated with the widget.
   */
  readonly settings: ServerConnection.ISettings;

  /**
   * The image element associated with the widget.
   */
  readonly img: HTMLImageElement;

  /**
   * Handle update requests for the widget.
   */
  onUpdateRequest(msg: Message): void {
    ServerConnection.makeRequest({url: 'https://egszlpbmle.execute-api.us-east-1.amazonaws.com/prod'}, this.settings).then(response => {
      this.img.src = response.data.img;
      this.img.alt = response.data.title;
      this.img.title = response.data.alt;
    });
  }
};


/**
 * Initialization data for the jupyterlab_xkcd extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_xkcd',
  autoStart: true,
  requires: [ICommandPalette],
  activate: activate
};


/**
 * Activate the xckd widget extension.
 */
function activate(app: JupyterLab, palette: ICommandPalette) {
  console.log('JupyterLab extension jupyterlab_xkcd is activated!');

  // Create a single widget
  let widget: XkcdWidget = new XkcdWidget();

  // Add an application command
  const command: string = 'xkcd:open';
  app.commands.addCommand(command, {
    label: 'Random xkcd comic',
    execute: () => {
      if (!widget.isAttached) {
        // Attach the widget to the main area if it's not there
        app.shell.addToMainArea(widget);
      }
      // Refresh the comic in the widget
      widget.update();
      // Activate the widget
      app.shell.activateById(widget.id);
    }
  });

  // Add the command to the palette.
  palette.addItem({ command, category: 'Tutorial' });
};


export default extension;
