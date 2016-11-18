

module.exports = function(app) {

    var api = app.api.device;

    app.get("/devices",api.lista);

    app.get('/devices/:serialNumber',api.buscaPorSerial);

    app.post("/devices",api.insere);

};
