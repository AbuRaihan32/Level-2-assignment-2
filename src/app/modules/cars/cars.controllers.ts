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

// ! get all cars controller function
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

// ! get specific car controller function
const getSpecificCar = async (req: Request, res: Response) => {
  const { carId } = req.params;
  try {
    const result = await carsServices.getSpecificCarFromDB(carId);
    if (result) {
      res.status(200).json({
        message: `specific car is retrieved successfully`,
        success: true,
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'not found!',
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

// ! update car
const updateCar = async (req: Request, res: Response) => {
  const { carId } = req.params;
  const updatedDoc = req.body;

  try {
    const result = await carsServices.updateCarIntoDB(carId, updatedDoc);
    if (result.modifiedCount) {
      res.status(200).json({
        message: `car is updated successfully`,
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

// ! delete car
const deleteCar = async (req: Request, res: Response) => {
  const { carId } = req.params;

  try {
    const result = await carsServices.deleteCarFromDB(carId);
    if (result.modifiedCount) {
      res.status(200).json({
        message: `car is deleted successfully`,
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
  getSpecificCar,
  updateCar,
  deleteCar,
};
