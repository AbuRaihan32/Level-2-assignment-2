import express, { Request, Response } from 'express';
import cors from 'cors';
import { carRouter } from './app/modules/cars/cars.routers';
import { orderRouters } from './app/modules/orders/orders.routers';

const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application routers
app.use('/api/cars', carRouter);
app.use('/api/orders', orderRouters);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
