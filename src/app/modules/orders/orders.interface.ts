import { TCar } from '../cars/cars.interface';

export type TOrder = {
  id: string;
  email: string;
  car: TCar;
  quantity: number;
  totalPrice: number;
};
