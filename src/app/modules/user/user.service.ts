import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const getAllUsers = async (): Promise<Array<User>> => {
  const users = await prisma.user.findMany();
  return users;
};

const getUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return user;
};

const getUserProfile = async (user: {
  userId: string;
  role: ENUM_USER_ROLE;
}): Promise<User | null> => {
  if (!user.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Access denied');
  }

  const specificUser = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });

  if (!specificUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return specificUser;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updatedUser = prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedUser;
};

const deleteUser = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  await prisma.user.delete({
    where: {
      id,
    },
  });

  return user;
};

const makeAdmin = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      role: 'ADMIN',
    },
  });

  return updatedUser;
};

export const UserService = {
  getAllUsers,
  getUserById,
  getUserProfile,
  updateUser,
  deleteUser,
  makeAdmin,
};
