import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  carId: z.string().min(1, { message: 'Car ID is required' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
  totalPrice: z.number().min(0, { message: 'Total price cannot be negative' }),
});
