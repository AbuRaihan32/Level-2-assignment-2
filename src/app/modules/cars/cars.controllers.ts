import { Request, Response } from 'express';
import { carValidationSchema } from './cars.validations';
import { carsServices } from './cars.services';

// ! car-create controller function
const SaveCar = async (req: Request, res: Response) => {
  const { car: carData } = req.body;
  try {
    const zodParsedCarData = carValidationSchema.parse(carData);

    const result = await carsServices.SaveCarIntoDB(zodParsedCarData);
    res.status(200).json({
      success: true,
      message: 'car is created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong!',
      error: err,
    });
  }
};

export const carControllers = {
  SaveCar,
};
