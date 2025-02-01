import { TOrder } from './orders.interface';
import { OrderModel } from './orders.model';

// ! create order
const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await OrderModel.create(orderData);
  return result;
};

export const orderServices = {
  createOrderIntoDB,
};
