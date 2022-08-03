import { config } from 'dotenv';
import express, { Application, Request, Response } from 'express';

const DEFAULT_PORT = 3000;

config();

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Express server with TypeScript');
});

const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
