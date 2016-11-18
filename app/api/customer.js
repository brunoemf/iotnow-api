var mongoose = require('mongoose');
var api = {};
var model = mongoose.model('Customer');

api.lista = function(req,res) {

    model.find()
          .then(function(result) {
            console.log('Recuperando lista de clientes...');
            res.status(200).json(result);
      }), function(error) {
            console.log(error);
            res.status(500).json(error);

      };

};

api.buscaPorEmail = function(req,res) {

      var email = req.params.email;
      console.log('Recuperando customer: '+email);

      model.find({email:email})
        .then(function(result) {
             if(result===null || result == ""){
                 console.log("Nenhum usuário encontrado!");
                 result = {"msg":"Nenhum registro encontrado!"};
                 res.status(404).json(result);
                 return;
             };
             console.log(result);
             res.status(200).json(result);
        }),function(error) {
             console.log('Erro ao recuperar customer: '+email);
             res.status(500);
        }

};

api.insere = function(req,res) {

      // Validation
     req.assert("name", "Name's  Empty").notEmpty();
     req.assert("lastName", "Last name is Empty").notEmpty();
     req.assert("email", "Email is Empty").notEmpty();
     req.assert("password", "Password is Empty").notEmpty();


     var errors = req.validationErrors();

     if (errors){
         console.log("Erros de validação encontrados");
         res.status(400).send(errors);
         return;
     }
     // End of validation

     var customer = req.body;

     console.log("Processando evento...");


     model.create(customer)
        .then(function(result) {
               customer.id = result.id;
               res.location('customers/'+customer.email);
               res.status(201).json(customer);
        }, function(error) {
               //console.log(error);
               let msg = error.errmsg;
               if (msg.includes("email_1 dup key")) {
                msg = "O usuário já existe.";
                console.log(msg);
                res.status(404).json(msg);
                return;
               }
               res.status(500).json(error);
        });

};



module.exports = api;
