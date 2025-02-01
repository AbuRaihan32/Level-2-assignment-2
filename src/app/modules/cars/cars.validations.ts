import { z } from 'zod';

export const carValidationSchema = z.object({
  brand: z.string().min(1, { message: 'Brand name is required' }).trim(),
  model: z.string().min(1, { message: 'Model name is required' }).trim(),
  year: z
    .number()
    .min(1886, { message: 'Year must be after 1885' })
    .max(new Date().getFullYear(), { message: 'Year cannot be in the future' }),
  price: z.number().min(0, { message: 'Price cannot be negative' }),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    errorMap: () => ({
      message:
        'Category must be one of Sedan, SUV, Truck, Coupe, or Convertible',
    }),
  }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' }),
  quantity: z.number().min(0, { message: 'Quantity cannot be negative' }),
  inStock: z.boolean({ required_error: 'Stock status is required' }),
  isDeleted: z.boolean().default(false),
});
