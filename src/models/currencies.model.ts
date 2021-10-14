import { model, Schema, Document } from 'mongoose';
import { Currency } from '../interfaces/currencies.interface';

const currencySchema: Schema = new Schema({
  _id: {
    type:Number,
    default: 1,
    unique: true,
    index: true
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
  var doc = this;

  next();
});

const currencyModel = model<Currency & Document>('Currency', currencySchema);

export default currencyModel;
