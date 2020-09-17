const {BrowserWindow, ipcRenderer} = require('electron');

module.exports ={
    cadastroMunicipios(parentWindow, id){
        const winMunicipios = new BrowserWindow({
            width: 800, 
            length: 600,
            parent: parentWindow, 
            modal: true,
            webPreferences: {
                worldSafeExecuteJavaScript: false,                
                nodeIntegration: true,
                enableRemoteModule: true                            
            }
        })
        
        winMunicipios.setMenu(null)
        winMunicipios.loadFile(`${__dirname}/cadastros/municipios.html`,{query: {"data": JSON.stringify(id)}})
        winMunicipios.webContents.openDevTools()       

        return winMunicipios;
    
    },
    listaMunicipios(parentWindow){
        const winListaMunicipios = new BrowserWindow({
            width: 1024, 
            length: 740,
            parent: parentWindow, 
            modal: true,
            webPreferences: {
                worldSafeExecuteJavaScript: false,                
                nodeIntegration: true,
                enableRemoteModule: true              
            }
        })
        
        winListaMunicipios.setMenu(null)
        console.log(`${__dirname}/listas/listaMunicipios.html`)        
        winListaMunicipios.loadFile(`${__dirname}/listas/lista-municipios.html`)
        winListaMunicipios.webContents.openDevTools()      
    },

}