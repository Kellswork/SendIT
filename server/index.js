import express from 'express';
import bodyParser from 'body-parser';
import parcel from './routes/parcels';
import auth from './routes/auth';
import user from './routes/users';
import logger from './config/winston';
import db from './models/db';


const app = express();

app.get('/', (req, res) => res.status(200).json({
  success: true,
  message: 'Welcome to SendIT courier service',
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/auth', auth);
app.use('/api/v1/parcels', parcel);
app.use('/api/v1/users', user);

app.use((req, res, next) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
});

const port = process.env.PORT || 8080;

const server = app.listen(port, () => logger.info(`app started at ${port}`));

export default server;
