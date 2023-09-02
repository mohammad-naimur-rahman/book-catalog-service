import { Order, OrderedBook } from '@prisma/client';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { asyncForEach } from '../../../helpers/asyncForeach';
import prisma from '../../../shared/prisma';
import { IOrderBody } from './order.interface';

const createOrder = async (
  payload: IOrderBody,
  user: { userId: string }
): Promise<Order> => {
  if (!user.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Access denied');
  }

  const { orderedBooks } = payload;
  const orderWithBooks = await prisma.$transaction(async transactionClient => {
    const order = await transactionClient.order.create({
      data: {
        userId: user.userId,
      },
    });

    await asyncForEach(orderedBooks, async (book: OrderedBook) => {
      await transactionClient.orderedBook.create({
        data: {
          orderId: order.id,
          bookId: book.bookId,
          quantity: +book.quantity,
        },
      });
    });

    return order;
  });

  const orderWithBooksIds = await prisma.order.findUnique({
    where: {
      id: orderWithBooks.id,
    },
    include: {
      orderedBooks: true,
    },
  });

  return orderWithBooksIds!;
};

const getOrders = async (user: { userId: string; role: ENUM_USER_ROLE }) => {
  if (!user.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Access denied');
  }

  const isAdmin = user.role === ENUM_USER_ROLE.ADMIN;
  let orders = [];
  if (isAdmin) {
    orders = await prisma.order.findMany({
      include: {
        orderedBooks: true,
      },
    });
  } else {
    orders = await prisma.order.findMany({
      where: {
        userId: user.userId,
      },
      include: {
        orderedBooks: true,
      },
    });
  }
  return orders;
};

const getSingleOrder = async (
  id: string,
  user: { userId: string; role: ENUM_USER_ROLE }
): Promise<Order | null> => {
  if (!user.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Access denied');
  }

  const isAdmin = user.role === ENUM_USER_ROLE.ADMIN;

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      orderedBooks: true,
    },
  });

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  if (!isAdmin && order.userId !== user.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Access denied');
  }

  return order;
};

export const OrderService = {
  createOrder,
  getOrders,
  getSingleOrder,
};
