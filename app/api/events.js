var mongoose = require('mongoose');
var AWS = require('aws-sdk');

var api = {};
var modelEvento = mongoose.model('Evento');
var modelDevice = mongoose.model('Device');
var modelCustomer = mongoose.model('Customer');
var modelPurchase = mongoose.model('Purchase');

var sns = new AWS.SNS({region:'us-east-1'});


api.lista = function(req,res) {

    modelEvento.find()
         .then(function(result) {
           console.log('Recuperando eventos...');

           res.status(200).json(result);
         }), function(error) {
           console.log(error);
           res.status(500).json(error);
         };
};

api.buscaPorSerial = function(req,res) {

    var serial = req.params.serialNumber;
    console.log('Recuperando evento(s) do equipamento: '+serial);

    modelEvento.find({serialNumber:serial})
          .then(function(result) {
            if(result===null || result == ""){
                console.log("Nenhum evento encontrado!");
                result = {"msg":"Nenhum registro encontrado!"};
                res.status(404).json(result);
                return;
            };
            console.log(result);
            res.status(200).json(result);
          }),function(error) {
            console.log('Erro ao recuperar eventos do equipamento: '+serial);
            res.status(500);
          }
};

api.insere = function(req,res) {

    // Validation
    req.assert("serialNumber", "Serial number is Empty").notEmpty();
    req.assert("eventDesc", "Event is Empty").notEmpty();


    var errors = req.validationErrors();

    if (errors){
        console.log("Erros de validação encontrados");
        res.status(400).send(errors);
        return;
    }
    // End of validation

    // Declarando Objeto para registro da solicitação de compra (Purchase)
    var purchase = {};

    // Recuperando dados do Evento enviado pelo Device
    var evento = req.body;

    console.log("Processando evento...");


    purchase.serialNumber = evento.serialNumber;
    purchase.eventDesc = evento.eventDesc;

    // Recuperando dados do Device:
    // @ Customer ID
    // @ Vendor ID
    // @ Product Code
    // @ Product Quantity

    modelDevice.findOne({serialNumber:evento.serialNumber})
         .then(function(result) {
            if(result===null || result == ""){
               console.log("Nenhum device encontrado.");
               res.status(404).end();
               return;
            };

            purchase.customer = result.customer;
            purchase.vendor = result.vendor;

            // Recupera Produto e Quantidade
            for (var i = 0; i < result.eventType.length; i++) {
               if(result.eventType[i].eType == evento.eventDesc){
                  purchase.product = result.eventType[i].mapTo
                  purchase.quantity = result.eventType[i].quantity

               }
            }

            purchase.status = false;
            purchase.purchaseDate = new Date;

            // Registra Purchase
            modelPurchase.create(purchase)
               .then(function resultPurchase(result) {

                  //let customer = purchase.customer;
                  modelCustomer.findOne({_id:purchase.customer})
                     .then(function resultBuscaCustomer(customer) {

                           var params = {
                              Message:'Clique no link para confirmar sua compra: http://iotnow.ddns.net/purchase/'+result._id,
                              PhoneNumber:customer.contact
                           };

                           // Descomente essa linha quando a função de envio de SMS estiver comentada.

                           res.status(201).json(result);

                           //Função para envio de SMS. Comentar o bloco para desabilitar a função.

                           // sns.publish(params,function(err,data) {
                           //
                           //    if (err) {
                           //       console.log("erro: "+err);
                           //       res.status(500).json(err);
                           //       return;
                           //    }
                           //    console.log("Mensagem enviada com sucesso. MessageID: "+data.MessageId);
                           //    res.location('/purchase/'+result._id)
                           //    res.status(201).json(result)
                           // });
                     }),function erroBubscaPorId(erro) {
                        console.log("erro: "+err);
                        res.status(500).json(err);
                        return;
                     };

               }),function purchaseError(error) {
                  res.status(500).json({"msg":"Erro Interno"})
               };

         }),function deviceError(error) {
            console.log("Erro na obtenção dos dados do Device");
            res.status(500)
         };

};

// Retorna o Objeto API.
module.exports = api;
