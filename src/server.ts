process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import CurrenciesRoute from './routes/currencies.route';
import AverageRoute from './routes/average.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new CurrenciesRoute(), new AverageRoute()]);

app.listen();