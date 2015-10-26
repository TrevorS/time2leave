'use strict';
const app           = require('app');
const BrowserWindow = require('browser-window');
const menubar       = require('menubar');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

let mb = menubar();

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mb = null;
}

mb.app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

mb.on('ready', () => {
	console.log('ready');
});
