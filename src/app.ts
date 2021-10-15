process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { dbConnection } from './databases';
import { Routes } from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import { logger, stream } from './utils/logger';
import axios from 'axios';
import * as cron from 'node-cron'

import currencyPriceModel from './models/currencyPrices.model';
import currencyModel from './models/currencies.model';
import { Currency } from './interfaces/currencies.interface';
import { CurrencyPrice } from './interfaces/currencyPrices.interface';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public currencies = currencyModel;
  public currencyPrices = currencyPriceModel;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.connectToDatabase();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.initializeSwagger();
    this.initializeJobs();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`); 
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    connect(dbConnection.url)
    .then(() => {
      console.log(`Connected to db: ${dbConnection.url} successfully via MONGOOSE`);
    }).catch((err: any) => {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. Error: ${err}`);
        process.exit(1);
    });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeJobs(){
    // const task = cron.schedule('0 0 */1 * * *', async () => {
    const task = cron.schedule('0/5 * * * * *', async () => {
      const currencies: Currency[] = await this.currencies.find();
        await Promise.all( currencies.map(async({symbol}) => {
          try {
            const {data:{price}}:any = await axios.get(`https://api.binance.com/api/v3/avgPrice?symbol=${symbol}`);
            const createCurrencyData: CurrencyPrice = await this.currencyPrices.create({ price, symbol });
          }catch (error) {
            console.log(error);
          }
        })

        )
    });



    task.start();
  }
}

export default App;
