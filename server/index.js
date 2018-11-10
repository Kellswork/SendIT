import express from 'express';
import bodyParser from 'body-parser';
import route from './routes/index';
import user from './routes/users';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/parcels', route);
app.use('/api/v1/users', user);
app.use((req, res, next) => {
  const error = new Error('Could not find page with this address');
  error.status = 404;
  next(error);
});

const port = process.env.PORT || 8080;

const server = app.listen(port);
console.log(`SendIT started on ${port}`);

export default server;
