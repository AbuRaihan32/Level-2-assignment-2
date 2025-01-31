import express from 'express';
import { carControllers } from './cars.controllers';

const router = express.Router();

router.post('/save-car', carControllers.SaveCar);

router.get('/', (req, res) => {
  res.json({
    message: 'hello',
  });
});

export const carRouter = router;
