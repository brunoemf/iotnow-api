
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/iotnow');

db.connection.on('connected',function() {
    console.log('Conectado ao MongoDB');;
});

db.connection.on('error',function(error) {
    console.log('Erro na conexão com o banco. Erro: '+error);
});

db.connection.on('disconnected',function() {
    console.log('Desconectado ao MongoDB');
});

process.on('SIGINT', function() {
        db.connection.close(function() {
            console.log('Aplicação terminada, conexão fechada');
            process.exit(0);
        });
});
