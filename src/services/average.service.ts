import { CreateCurrencyDto } from '../dtos/currencies.dto';
import { HttpException } from '../exceptions/HttpException';
import { Currency } from '../interfaces/currencies.interface';
import currencyPriceModel from '../models/currencyPrices.model';
import { isEmpty } from '../utils/util';

class AverageService {
  public currencyPrices = currencyPriceModel;

  public async findAverage( symbol, lecture ): Promise<any> {

    const currencies: any = await this.currencyPrices.aggregate([
        { $match: {symbol} },
        {$sort:{"createdAt":-1}},
        { $limit: +lecture },
        { $group: {_id: "$_id", average:{ $avg: '$price'}}}
    ]);

    return currencies[0];
  }

}

export default AverageService;
