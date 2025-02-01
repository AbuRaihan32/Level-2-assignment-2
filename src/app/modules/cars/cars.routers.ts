import express from 'express';
import { carControllers } from './cars.controllers';

const router = express.Router();

router.post('/save-car', carControllers.SaveCar);
router.get('/', carControllers.gelAllCars);
router.get('/:carId', carControllers.getSpecificCar);
router.put('/:carId', carControllers.updateCar);
router.delete('/:carId', carControllers.deleteCar);

export const carRouter = router;
