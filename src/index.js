const { app, BrowserWindow } = require('electron');
const path = require('path');

// Use electron-reload only in development mode
if (process.env.NODE_ENV !== 'production') {
  try {
    require('electron-reload')(path.join(__dirname, 'index.js'), {
      // Reload when any files in the current directory change
      electron: require(`${__dirname}/node_modules/electron`)
    });
  } catch (err) {
    console.error('Failed to load electron-reload', err);
  }
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
