const callWindows = require('./call-windows.js');

module.exports={
    geraMenuPrincipalTemplate(mainWindow){
        let templateMenu = [            
            {
                label: 'Cadastros',
                submenu: [
                {
                    label: 'Municipios',
                    click: ()=>{
                        callWindows.cadastroMunicipios(mainWindow, 0)      
                    }
                },                
                {
                    label: 'Lista Municipios',
                    click: ()=>{
                        callWindows.listaMunicipios(mainWindow)      
                    }
                }                
                ]  
            }
        ]    
        return templateMenu;    
    }
}