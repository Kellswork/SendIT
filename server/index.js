import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import parcel from './routes/parcels';
import auth from './routes/auth';
import user from './routes/users';
import logger from './config/winston';
import home from './routes/home';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('client'));
app.use('/', home);
app.use('/api/v1/auth', auth);
app.use('/api/v1/parcels', parcel);
app.use('/api/v1/users', user);
app.use((req, res, next) => {
  const error = new Error('page not found');
  res.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status = (err.status || 500);
  res.json({
    error: err.message,
  });
  next();
});
const port = process.env.PORT || 8080;

const server = app.listen(port, () => logger.info(`SendIT started at ${port}`));

export default server;
