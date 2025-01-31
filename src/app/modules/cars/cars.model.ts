import { model, Schema } from 'mongoose';
import { TCar } from './cars.interface';

const CarSchema = new Schema<TCar>({
  id: {
    type: String,
    required: [true, 'id is required'],
    unique: [true, 'id mast be unique'],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required'],
    trim: true,
  },
  model: {
    type: String,
    required: [true, 'Model name is required'],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, 'Manufacturing year is required'],
    min: [1886, 'Year must be after 1885'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  category: {
    type: String,
    required: [true, 'Car category is required'],
    enum: {
      values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
      message:
        'Category must be one of Sedan, SUV, Truck, Coupe, or Convertible',
    },
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters long'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'Stock status is required'],
  },
});

export const CarModel = model<TCar>('car', CarSchema);
