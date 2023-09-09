const {app, BrowserWindow} = require('electron');
const path = require('path');

function crearVentanaPrincipal() {
    let ventanaPrincipal = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js') //archivo js que se debe cargar antes de cargar la ventana
        }
    });

    ventanaPrincipal.loadFile('index.html'); //archivo que debe cargarse

}

app.whenReady().then(crearVentanaPrincipal);


// para agregar compatibilidad para MAC-OS

//cierra mata el proceso cuando le das a la x para cerrar
app.on('window-all-closed', function () {
   if (process.platform !== 'darwin') {
        app.quit();
   } 
});

// detecta que todo esta cerrado antes de volver a arrancar la aplicacion de nuevo
app.on('activate', function(){
    if (BrowserWindow.getAllWindows().length === 0) {
        crearVentanaPrincipal();
    }
})