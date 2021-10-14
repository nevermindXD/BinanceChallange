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
  this.constructor.find().sort('-_id').then((result) => {
    if(!result.length)
      this._id = 1;
    else
      this._id = result[0]._id + 1;
    next();
  });
});

const currencyModel = model<Currency & Document>('Currency', currencySchema);

export default currencyModel;
