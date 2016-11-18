var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var purchaseSchema = Schema({

      serialNumber:String,
      eventDesc:String,
      customer:{type:Schema.Types.ObjectId,ref:'Customer'},
      vendor:{type:Schema.Types.ObjectId,ref:'Vendor'},
      product:Number,
      quantity:Number,
      status:Boolean,
      purchaseDate:Date,

});

mongoose.model('Purchase',purchaseSchema);
