import { Router } from 'express';
import AverageController from '../controllers/average.controller';
import { Routes } from '../interfaces/routes.interface';

class CurrenciesRoute implements Routes {
  public path = '/average';
  public router = Router();
  public averageController = new AverageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.averageController.getAverage);
  }
}

export default CurrenciesRoute;
