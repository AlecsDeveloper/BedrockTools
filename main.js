const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600
    });

    window.loadFile('src/index.html') // ruta de archivo html
}

app.whenReady().then(() => {
    createWindow();
});