var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var vendorSchema = Schema({

  name: {
    type: String,
    required: true
  },
  cnpj:{
     type: String,
     require: true,
     unique: true,
  },
  produtos:[{
     name: {type: String},
     code: {type:Number,min:5,max:10,unique:true}
 }]

});

mongoose.model('Vendor',vendorSchema);
