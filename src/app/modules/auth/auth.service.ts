import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUser, ILoginUserResponse, ISignupUser } from './auth.interface';
import { hashPasswordHook } from './auth.utils';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await bcrypt.compare(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token
  const { id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const signupUser = async (payload: User): Promise<ISignupUser> => {
  // Omiiting user role so that user can not set him / her as admin
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { password, role, ...userData } = payload;

  const hashedPassword = await hashPasswordHook(password);

  const createdUser = await prisma.user.create({
    data: { password: hashedPassword, ...userData },
  });

  const accessToken = jwtHelpers.createToken(
    { userId: createdUser.id, role: createdUser.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId: createdUser.id, role: createdUser.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    data: createdUser,
    token: {
      accessToken,
      refreshToken,
    },
  };
};

// const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
//   //verify token
//   // invalid token - synchronous
//   let verifiedToken = null;
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret
//     );
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }

//   const { userId } = verifiedToken;

//   // tumi delete hye gso  kintu tumar refresh token ase
//   // checking deleted user's refresh token

//   const isUserExist = await User.isUserExist(userId);
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   //generate new token

//   const newAccessToken = jwtHelpers.createToken(
//     {
//       id: isUserExist.id,
//       role: isUserExist.role,
//     },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );

//   return {
//     accessToken: newAccessToken,
//   };
// };

// const changePassword = async (
//   user: JwtPayload | null,
//   payload: IChangePassword
// ): Promise<void> => {
//   const { oldPassword, newPassword } = payload;

//   // // checking is user exist
//   // const isUserExist = await User.isUserExist(user?.userId);

//   //alternative way
//   const targetedUser = await User.findOne({ id: user?.userId }).select(
//     '+password'
//   );

//   if (!targetedUser) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }

//   // checking old password
//   if (
//     targetedUser.password &&
//     !(await User.isPasswordMatched(oldPassword, targetedUser.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
//   }

//   targetedUser.password = newPassword;
//   targetedUser.needsPasswordChange = false;

//   // updating using save()
//   targetedUser.save();
// };

export const AuthService = {
  loginUser,
  signupUser,
};
