'use strict'
const {app, BrowserWindow} = require('electron')

// prevent window being garbage collected
let mainWindow

function createMainWindow () {
  const win = new BrowserWindow({
    width: 480,
    height: 480,
    frame: false,
    resizable: false,
    maximizable: false
  })

  win.loadURL(`file://${__dirname}/index.html`)
  win.on('closed', () => {
    mainWindow = null
  })

  return win
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', () => {
  mainWindow = createMainWindow()
})
