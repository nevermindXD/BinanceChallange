import { model, Schema, Document } from 'mongoose';
import { Currency } from '../interfaces/currencies.interface';

const currencySchema: Schema = new Schema({
  _id: {
    type:Number,
    default: 0
  },
  symbol: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  versionKey: false
});

currencySchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   delete ret._id  }
});


currencySchema.pre('save', function(next) {
  this.constructor.find().then((result) => {
    console.log('find',result)
    this._id = result.length + 1;
    console.log('this',this)
    next();
  });
});

const currencyModel = model<Currency & Document>('Currency', currencySchema);

export default currencyModel;
