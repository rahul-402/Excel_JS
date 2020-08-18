const electron = require('electron');
const app = electron.app;
const ejs = require("ejs-electron");

ejs.data({
    "title":"My Excel",
    "rows":100,
    "cols":26
})
function createWindow() {
    const win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        //to open app in hidden
        show: false,
        webPreferences:{
            nodeIntegration:true
        }
    })
    win.loadFile("./index.ejs").then(function(){
       //to remove default menu
       win.removeMenu();
       //maximize
       win.maximize();
       win.show();
       win.webContents.openDevTools();
    }).catch(function(err){
console.log(err);
    });
}

app.whenReady().then(createWindow);

//syntax
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })