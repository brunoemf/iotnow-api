var app = require('./config/custom-express')();

app.listen(80,function openConnection() {
  console.log("Servidor rodando...")
})
