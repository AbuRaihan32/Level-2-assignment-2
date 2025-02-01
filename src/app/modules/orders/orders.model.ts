import { model, Schema } from 'mongoose';
import { TOrder } from './orders.interface';

const OrderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    carId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const OrderModel = model<TOrder>('order', OrderSchema);
