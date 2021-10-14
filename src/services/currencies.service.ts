import { CreateCurrencyDto } from '../dtos/currencies.dto';
import { HttpException } from '../exceptions/HttpException';
import { Currency } from '../interfaces/currencies.interface';
import currencyModel from '../models/currencies.model';
import { isEmpty } from '../utils/util';

class CurrencyService {
  public currencies = currencyModel;

  public async findAllCurrency(): Promise<Currency[]> {
    const currencies: Currency[] = await this.currencies.find();
    return currencies;
  }

  public async createCurrency(currencyData: CreateCurrencyDto): Promise<Currency> {
    if (isEmpty(currencyData)) throw new HttpException(400, "You're not currencyData");

    const findCurrency: Currency = await this.currencies.findOne({ symbol: currencyData.symbol });
    if (findCurrency) throw new HttpException(409, `${currencyData.symbol} already exists`);

    const createCurrencyData: Currency = await this.currencies.create({ ...currencyData });

    return createCurrencyData;
  }

}

export default CurrencyService;
