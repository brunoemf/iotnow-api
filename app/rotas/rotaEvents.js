
module.exports = function(app) {

    var api = app.api.events;


    app.get("/eventos",api.lista);

    app.get("/eventos/:serialNumber",api.buscaPorSerial);

    app.post("/eventos",api.insere);

};
