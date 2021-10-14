import { model, Schema, Document } from 'mongoose';
import { Currency } from '../interfaces/currencies.interface';

const currencySchema: Schema = new Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  // createdAt: {
  //     type: Date,
  //     required: true,
  //     default: Date.now,
  // }
});

const currencyModel = model<Currency & Document>('Currency', currencySchema);

export default currencyModel;
