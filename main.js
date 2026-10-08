const { app, BrowserWindow, shell } = require("electron");
const path = require("path");

if (!app.requestSingleInstanceLock()) app.quit();

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1100, height: 860, minWidth: 420, minHeight: 600,
    title: "Pocket Ledger", autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, sandbox: true, nodeIntegration: false }
  });
  win.loadFile(path.join(__dirname, "index.html"));
  // Never navigate away from the app; open any web link in the normal browser.
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: "deny" }; });
  win.webContents.on("will-navigate", (e, url) => { if (!url.startsWith("file://")) { e.preventDefault(); shell.openExternal(url); } });
  // Let the window close normally even if the page asks to confirm leaving.
  win.webContents.on("will-prevent-unload", (e) => e.preventDefault());
}

app.on("second-instance", () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
