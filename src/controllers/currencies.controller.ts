import { NextFunction, Request, Response } from 'express';
import { CreateCurrencyDto } from '../dtos/currencies.dto';
import { Currency } from '../interfaces/currencies.interface';
import currencyService from '../services/currencies.service';

class CurrenciesController {
  public currencyService = new currencyService();

  public getCurrencies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCurrenciesData: Currency[] = await this.currencyService.findAllCurrency();

      res.status(200).json({ results: findAllCurrenciesData });
    } catch (error) {
      next(error);
    }
  };

  public createCurrency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateCurrencyDto = req.body;
      const createCurrencyData: Currency = await this.currencyService.createCurrency(userData);

      res.status(201).json({ data: createCurrencyData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };



}

export default CurrenciesController;
