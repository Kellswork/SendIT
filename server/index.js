import express from 'express';
import bodyParser from 'body-parser';
import parcel from './routes/parcels';
import user from './routes/users';
import logger from './config/winston';


const app = express();

app.get('/', (req, res) => res.status(200).json({
  success: true,
  message: 'Welcome to SendIT courier service',
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/parcels', parcel);
app.use('/api/v1/users', user);
app.use((req, res, next) => {
  const error = new Error('Could not find page with this address');
  error.status = 404;
  next(error);
});

const port = process.env.PORT || 8080;

const server = app.listen(port, () => logger.info(`app started at ${port}`));

export default server;
