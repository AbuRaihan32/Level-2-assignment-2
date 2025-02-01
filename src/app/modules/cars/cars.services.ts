import { CarModel } from './cars.model';
import { TCar } from './cars.interface';

const SaveCarIntoDB = async (carData: TCar) => {
  const result = await CarModel.create(carData);
  return result;
};

const getAllCarsFromDB = async (searchTerm: string) => {
  const result = await CarModel.aggregate([
    {
      $match: {
        $or: [
          { category: { $regex: new RegExp(searchTerm, 'i') } },
          { brand: { $regex: new RegExp(searchTerm, 'i') } },
          { model: { $regex: new RegExp(searchTerm, 'i') } },
        ],
      },
    },
  ]);
  return result;
};

export const carsServices = {
  SaveCarIntoDB,
  getAllCarsFromDB,
};
