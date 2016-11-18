  var mongoose = require('mongoose');
  var api = {};
  var model = mongoose.model('Device');

  api.lista = function(req,res) {

      model.find()
        .then(function(result) {
          console.log('Recuperando devices...');
          res.status(200).json(result);
        }), function(error) {
          console.log(error);
          res.status(500).json(error);
        };

  };

  api.buscaPorSerial = function(req,res) {

      var serial = req.params.serialNumber;

      console.log('Recuperando device: '+serial);

      model.find({serialNumber:serial})
        .then(function(result) {
          if(result===null || result == ""){
              console.log("Nenhum device encontrado!");
              result = {"msg":"Nenhum registro encontrado!"};
              res.status(404).json(result);
              return;
          };
          console.log(result);
          res.status(200).json(result);
        }),function(error) {
          console.log('Erro ao recuperar device: '+serial);
          res.status(500);
        }

  };

  api.insere = function(req,res) {

      // Validation
      req.assert("serialNumber", "Serial number is Empty").notEmpty();
      req.assert("clientID", "Cleint is Empty").notEmpty();
      req.assert("fornecedorID", "Cleint is Empty").notEmpty();


      var errors = req.validationErrors();

      if (errors){
          console.log("Erros de validação encontrados");
          res.status(400).send(errors);
          return;
      }
      // End of validation

      var device = req.body;

      console.log("Processando evento...");


      model.create(device)
        .then(function(result) {
            device.id = result.id;
            res.location('devices/'+device.serialNumber);
            res.status(201).json(device);
        }, function(error) {
            console.log(error);
            res.sendStatus(500);
        });

  };

  // Retorna o Objeto API.
  module.exports = api;
