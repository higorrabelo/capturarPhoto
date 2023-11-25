const { app, BrowserWindow, dialog } = require('electron');
const { ipcMain } = require('electron/main');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const options = {
  filters: [
    { name: 'Imagens', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Todos os Arquivos', extensions: ['*'] }
  ],
  properties: ['openFile', 'multiSelections']
};

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcMain.handle('minimize', () => {
    mainWindow.minimize();
  })
  ipcMain.handle('maximize', () => {
    mainWindow.maximize();
  })

  ipcMain.handle('openPhoto', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if (!canceled) {
      return filePaths[0]
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, './public/index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

ipcMain.handle('exit', () => {
  app.quit();
})



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
