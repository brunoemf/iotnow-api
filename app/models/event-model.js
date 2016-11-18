var mongoose = require('mongoose');

var schema = mongoose.Schema({

  serialNumber: {
    type: String,
    required: true
  },
  battery: {
    type: Number,
    required: false
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventDesc: {
    type: String,
    required: true
  }

});

mongoose.model('Evento',schema);
