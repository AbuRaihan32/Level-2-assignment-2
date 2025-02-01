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

const gelAllCars = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;

  try {
    const result = await carsServices.getAllCarsFromDB(searchTerm as string);
    if (result.length === 0) {
      res.status(500).json({
        success: false,
        message: `No data found for ${searchTerm}`,
      });
    } else {
      res.status(200).json({
        message: `${searchTerm ? searchTerm : 'all'} cars is retrieved successfully`,
        success: true,
        data: result,
      });
    }
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
  gelAllCars,
};
