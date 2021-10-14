import { model, Schema, Document } from 'mongoose';
import { CurrencyPrice } from '../interfaces/currencyPrices.interface';

const currencyPriceSchema: Schema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  createdAt: {
    type:Date,
    default: Date.now
  }
}, {
  versionKey: false
});


const currencyPriceModel = model<CurrencyPrice & Document>('CurrencyPrice', currencyPriceSchema);

export default currencyPriceModel;