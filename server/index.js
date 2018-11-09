import express from 'express';
import bodyParser from 'body-parser';
import route from './routes/index';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/parcels', route);

const port = process.env.port || 4000;

app.listen(port, () => console.log(`SendIT started on ${port}`));
