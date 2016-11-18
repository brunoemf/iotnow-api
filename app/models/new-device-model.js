var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deviceSchema = Schema({


      serialNumber:{type:String,unique:true},
      battery:Number,
      eventType:[
        {
           eType:{type:String,unique:true},
           mapTo:Number,
           quantity:Number
        }
      ],
      vendor:{type: Schema.Types.ObjectId,ref: 'Vendor'},
      customer:{type: Schema.Types.ObjectId,ref: 'Customer'},
      createdOn:Date,
      lastUpdate:Date


});

mongoose.model('Device',deviceSchema);
