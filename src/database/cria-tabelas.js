const database = require('./database');

module.exports = function criaTabelas(){
    database.run('CREATE TABLE IF NOT EXISTS TB_MUNICIPIOS (ID INTEGER PRIMARY KEY, DESCRICAO TEXT NOT NULL, UF TEXT)', (err)=>{
        if (err){
            return console.log('Nao foi possivel criar a tabela: '+ err.message)
        }else{
            console.log('Tabela criada.')
        }
    });    
    
    database.close();
}



