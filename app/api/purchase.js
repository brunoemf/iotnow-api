var mongoose = require('mongoose');
var api = {};
var model = mongoose.model('Purchase');

api.confirma = function (req,res) {
   let purchase = req.params.id;

   model.findOne({_id:purchase})
      .then(function(result) {
         //Verifica se a compra já foi confirmada
         if(result.status == true){
               let msg = {"msg":"Esta compra já foi confirmada"}
               res.status(200).json(msg);
         }

         // Confirma a compra, caso ainda não tenha sido confirmada antes.
         model.update({_id:purchase},{$set:{status:true}})
            .then(function (result) {
               let msg = {"msg":"Compra confirmada com sucesso"}

               res.status(201).json(msg);
            }),function (error) {
               res.status(404).json(error);
         };
      }),function (error) {

      };

}

api.lista = function (req,res) {
   model.find()
        .then(function(result) {
          console.log('Recuperando compras...');

          res.status(200).json(result);
        }), function(error) {
          console.log(error);
          res.status(500).json(error);
        };
}


module.exports = api;
