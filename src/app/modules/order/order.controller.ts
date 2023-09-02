/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const order = await OrderService.createOrder(req.body, (req as any).user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully',
    data: order,
  });
});

const getAllORders = catchAsync(async (req, res) => {
  const orders = await OrderService.getOrders((req as any).user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order retrieved successfully',
    data: orders,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const orders = await OrderService.getSingleOrder(
    req.params.id,
    (req as any).user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: orders,
  });
});

export const OrderController = {
  createOrder,
  getAllORders,
  getSingleOrder,
};
