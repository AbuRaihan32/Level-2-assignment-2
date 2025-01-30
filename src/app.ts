import express, { Request, Response } from 'express';
import cors from 'cors';
import { carRouter } from './app/modules/cars/cars.routers';

const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application routers
app.use('/api/v1/cars', carRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
