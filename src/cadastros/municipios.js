const db = require('../database/database.js')
const remote = require('electron').remote;
var ipcRenderer = require('electron').ipcRenderer;
const querystring = require('querystring');

var buttonConfirmar = document.getElementById('confirmar');
var buttonCancelar = document.getElementById('cancelar');
var descrcicao = document.getElementById('descricao');
var uf = document.getElementById('uf');
var id = 0;

console.log(buttonConfirmar)


//Este codigo pega o id passado como parametro
let query = querystring.parse(global.location.search);
let data = JSON.parse(query['?data'])

id = data;

if (id != 0){
    let sql = 'SELECT ID, DESCRICAO, UF FROM TB_MUNICIPIOS WHERE ID = ?';
    
    db.get(sql, [id], (err, row)=>{
      if  (err){
         console.log('Erro ao consultar municipio, id: '  + id + ' ' + err.message);
      }else{
         console.log('row: '+ row + 'id: '+id)
         descrcicao.value = row.DESCRICAO
         uf.value = row.UF
      }
    })
}

buttonConfirmar.addEventListener('click',()=>{
    console.log("conteudo: "+descrcicao.value + "uf: "+uf.value);

    var sql = null;
    var data = null;

    if (id != 0){
      sql = 'UPDATE TB_MUNICIPIOS SET DESCRICAO = ?, UF = ? WHERE ID = ?';
      data = [descrcicao.value, uf.value, id]
    }else{
      sql = 'INSERT INTO TB_MUNICIPIOS(DESCRICAO, UF) VALUES(?,?)';
      data = [descrcicao.value, uf.value]
    }           
        
    db.run(sql, data, function(err) {
        if (err) {
          return console.log(err.message);
        }
        if  (id == 0){
          console.log(`A row has been inserted with rowid ${this.lastID}`);
        }else{
          console.log(`A row has been updated with rowid ${id}`);
        }        
        
    });
    
    // close the database connection
    //db.close();    
          
    let w = remote.getCurrentWindow()    
    w.close()
})

buttonCancelar.addEventListener('click',()=>{    
    let w = remote.getCurrentWindow()    
    w.close()
})

ipcRenderer.on('municipio-alteracao', function (event,store) {
  buttonConfirmar.style.backgroundColor ="red"
  console.log('municipio-alteracao')
});