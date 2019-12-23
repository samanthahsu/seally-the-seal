const electron = require('electron');
const url = require('url');
const path = require('path');
const fetch = require("node-fetch");

const {app, BrowserWindow} = electron;

process.env.NODE_ENV = 'production';

let mainWindow;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width:180,
        height: 180,
        noderIntegration: true,
        frame: false,
        toolbar: false,
        transparent: true,
        resizable: false
    
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: 'file',
        slashes: true
    }));

    mainWindow.on('maximize', function(){
        mainWindow.restore();
    })

    // quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    });

});