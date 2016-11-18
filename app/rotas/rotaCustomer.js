
module.exports = function(app) {

   var api = app.api.customer;


    app.get("/customers",api.lista);

    app.get('/customers/:email',api.buscaPorEmail);

    app.post("/customers",api.insere);






      };
