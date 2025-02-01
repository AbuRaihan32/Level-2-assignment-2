import { Request, Response } from 'express';
import { orderValidationSchema } from './orders.validation';
import { carsServices } from '../cars/cars.services';
import { orderServices } from './orders.services';

// ! create order controller
const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const zodParsedOrderData = orderValidationSchema.parse(order);
    const { carId, quantity } = zodParsedOrderData;

    const carData = await carsServices.getSpecificCarFromDB(carId);

    if (!carData) {
      throw new Error('carId not found!');
    } else if (carData.quantity < quantity) {
      throw new Error('Insufficient stock available');
    } else {
      await carsServices.updateCarIntoDB(carId, {
        $inc: { quantity: -quantity },
        $set: { inStock: carData.quantity - quantity !== 0 },
      });
      const result = await orderServices.createOrderIntoDB(zodParsedOrderData);

      res.status(200).json({
        message: 'order is created successfully',
        success: true,
        data: result,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'something went wrong!',
      success: false,
      error: err,
    });
  }
};

export const orderControllers = {
  createOrder,
};
