import {
    app,
    BrowserWindow,
    Menu,
    Tray
} from 'electron';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let appIcon;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    // ---[ Window ]---
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 85,
        frame: false,
        transparent: true,
        skipTaskbar: true
    });

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    // Open the DevTools
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    //---[ Taskbar Icon ]---
    appIcon = new Tray(`${__dirname}/res/icon.png`);
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Settings',
            type: 'normal',
            enabled: false
        },
        {
            type: 'separator'
        },
        {
            label: 'Exit',
            type: 'normal',
            click: (menuItem, browserWindow, event) => {
                mainWindow.close();
            }
        }
    ]);

    appIcon.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });

    appIcon.setContextMenu(contextMenu);

});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.