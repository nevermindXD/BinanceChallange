process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
// import CurrenciesRoute from '@routes/currencies.route';
import validateEnv from './utils/validateEnv';

validateEnv();

// const app = new App([new IndexRoute(), new UsersRoute(), new CurrenciesRoute(), new AuthRoute()]);
const app = new App([new IndexRoute()]);

app.listen();