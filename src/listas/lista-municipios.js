const db = require('../database/database.js');
const callWindows = require('../call-windows.js');
const { remote, ipcRenderer} = require('electron');

var dados = document.getElementById("dados");
var btnRecarregar = document.getElementById("recarregar");
var btnExcluir = document.getElementById("excluir");
var btnAdicionar = document.getElementById("adicionar");

window.addEventListener("load", function(event) {
    carregaLista();
});

btnRecarregar.addEventListener("click", function(event){
     carregaLista();    
})

btnAdicionar.addEventListener("click", function(event){
    ipcRenderer.send('cadastro-municipios',0)                            
})

btnExcluir.addEventListener("click", function(event){
  let dados = document.getElementsByClassName("row");
    
  for (i = 0; i < dados.length; i++){          
    let item = dados[i];

    let check = item.getElementsByClassName("checkExcluir");
    
    if (check[0].checked){
      excluir(check[0].id)
    }
    
  }

  carregaLista()
})

function carregaLista(){
        
    let sql = `SELECT * FROM TB_MUNICIPIOS`
                   
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      var resulado = "";
      rows.forEach((row) => {
        resulado += `<tr class="row" id=${row.ID}>                         
                        <th><input type="checkbox" id="${row.ID}" class="checkExcluir"></th>
                        <th>${row.ID}</th>
                        <th>${row.DESCRICAO}</th>
                        <th>${row.UF}</th>
                        <th><input id="${row.ID}" type="button" class="buttonAlterar" value="+"></th>
                     </tr>`             
      });      
            
      dados.innerHTML = resulado;

      var linhas = document.getElementsByClassName("buttonAlterar")

      console.log(linhas)
      
      for (i = 0; i < linhas.length; i++){          
          linhas[i].style.backgroundColor = "red";          
          linhas[i].addEventListener("click", (event)=>{
              
              //var teste = remote.getCurrentWindow()
                    
              console.log(event.composedPath())
              ipcRenderer.send('cadastro-municipios',event.composedPath()[0].id)                            
              //callWindows.cadastroMunicipios(remote.getCurrentWindow(),1)
          })
      }         
    });        
}

function excluir(id){
  let sql = "DELETE FROM TB_MUNICIPIOS WHERE id = ?"
  db.run(sql, id, function(err){
    if (err){
      console.log('Erro ao excluir item: '+  id + ' Message: ' +err.message )
    }else{
      console.log(`Row(s) deleted ${this.changes}`);
    }
  })
}