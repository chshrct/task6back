import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express, { Application, Request, Response } from 'express';

import Data from './src/endpoints/data';
import Localization from './src/endpoints/localization';
import { connect } from './src/models/db/mongoose.connection';

const DEFAULT_PORT = 3000;

config();

const app: Application = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'https://task6front.vercel.app' }));

connect();

app.get('/', (req: Request, res: Response) => {
  res.send(`Express server with TypeScript  `);
});

app.get('/localization', Localization.getLocalizations);

app.get('/getPages', Data.getPages);
app.get('/getPage', Data.getPage);
app.get('/getCSV', Data.getCSV);

const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
