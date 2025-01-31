import { CarModel } from './cars.model';
import { TCar } from './cars.interface';

const SaveCarIntoDB = async (carData: TCar) => {
  const result = await CarModel.create(carData);
  return result;
};

export const carsServices = {
  SaveCarIntoDB,
};
