var mongoose = require('mongoose');

var schema = mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true
  },
  contact: {
     type: String,
     require: true
  }

});

schema.statics.buscaPorId = function (id,cb) {
   return this.findOne({_id:id},cb);
};

mongoose.model('Customer',schema);
