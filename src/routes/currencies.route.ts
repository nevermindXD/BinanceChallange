import { Router } from 'express';
import CurrenciesController from '../controllers/currencies.controller';
import { CreateCurrencyDto } from '../dtos/currencies.dto';
import { Routes } from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class CurrenciesRoute implements Routes {
  public path = '/currencies';
  public router = Router();
  public currenciesController = new CurrenciesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.currenciesController.getCurrencies);
    this.router.post(`${this.path}`, validationMiddleware(CreateCurrencyDto, 'body'), this.currenciesController.createCurrency);
  }
}

export default CurrenciesRoute;
