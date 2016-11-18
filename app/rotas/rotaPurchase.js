
module.exports = function(app) {

   var api = app.api.purchase;


   //  app.get("/customers",api.lista);
    //
   //  app.get('/customers/:email',api.buscaPorEmail);
    //
   //  app.post("/customers",api.insere);

    app.put("/purchase/:id",api.confirma);






      };
