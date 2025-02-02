import { TOrder } from './orders.interface';
import { OrderModel } from './orders.model';

// ! create order
const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await OrderModel.create(orderData);
  return result;
};

// ! calculate revenue
const calculateRevenue = async () => {
  const result = await OrderModel.aggregate([
    // stage-1
    {
      $lookup: {
        from: 'cars',
        let: { carId: '$carID' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$_id', { $toObjectId: '$$carId' }],
              },
            },
          },
          {
            $project: {
              _id: 0,
              price: 1,
            },
          },
        ],
        as: 'carData',
      },
    },

    {
      $addFields: {
        total: {
          $multiply: ['$quantity', { $arrayElemAt: ['$carData.price', 0] }],
        },
      },
    },

    // stage-2
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$total' },
      },
    },

    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  return result;
};

export const orderServices = {
  createOrderIntoDB,
  calculateRevenue,
};
