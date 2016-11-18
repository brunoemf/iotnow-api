var mongoose = require('mongoose');

var schema = mongoose.Schema({

  serialNumber: {
    type: String,
    required: true,
    unique: true
  },
  clientID: {
    type: Number,
    required: true
  },
  fornecedorID: {
    type: Number,
    required: true
  }

});

//mongoose.model('Device2',schema);
