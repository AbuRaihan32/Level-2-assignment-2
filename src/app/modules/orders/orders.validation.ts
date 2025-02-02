import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  carID: z.string().min(1, { message: 'carId is required' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});
