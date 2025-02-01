import express from 'express';
import { orderControllers } from './orders.controller';

const router = express.Router();

router.post('/create-order', orderControllers.createOrder);

export const orderRouters = router;
