const electron = require("electron");
const app = electron.app;
const Tray = electron.Tray;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
let tray = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 260,
    height: 78,
    alwaysOnTop: true,
    show: false,
    frame: false,
    skipTaskbar: true
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => {
    mainWindow = null;
    tray.destroy();
  });
  mainWindow.on("blur", () => {mainWindow.hide()});
  tray = new Tray(
    isDev
      ? "public/favicon.ico"
      : path.join(__dirname, "../build/favicon.ico"));
  tray.on("click", (_, __, position) => {
    mainWindow.setPosition(position.x - 260, position.y > 200?position.y - 98:position.y + 20);
    mainWindow.show();
  });
  tray.on("right-click", () => {mainWindow.close()})
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
