import { CarModel } from './cars.model';
import { TCar } from './cars.interface';

//! create car
const SaveCarIntoDB = async (carData: TCar) => {
  const result = await CarModel.create(carData);
  return result;
};

//! get all cars
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

//! get specific car
const getSpecificCarFromDB = async (carId: string) => {
  const result = await CarModel.findOne({ _id: carId });
  return result;
};

// ! update car
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateCarIntoDB = async (carId: string, updatedDoc: any) => {
  const result = await CarModel.updateOne({ _id: carId }, updatedDoc);
  return result;
};

// ! delete car
const deleteCarFromDB = async (carId: string) => {
  const result = await CarModel.updateOne({ _id: carId }, { isDeleted: true });
  return result;
};

export const carsServices = {
  SaveCarIntoDB,
  getAllCarsFromDB,
  getSpecificCarFromDB,
  updateCarIntoDB,
  deleteCarFromDB,
};
