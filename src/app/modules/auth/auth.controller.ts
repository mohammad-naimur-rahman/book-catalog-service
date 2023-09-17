import { User } from '@prisma/client';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, accessToken } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  res.status(httpStatus.OK).json({
    statusCode: 200,
    success: true,
    message: 'User logged in successfully!',
    token: accessToken,
  });
});

const signupUser = catchAsync(async (req, res) => {
  const result = await AuthService.signupUser(req.body);

  sendResponse<User>(res, {
    statusCode: 200,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const {
    cookies: { refreshToken },
  } = req;
  const newAccessToken = await AuthService.refreshToken(
    req.cookies.refreshToken
  );

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Generated new access token successfully!',
    data: newAccessToken,
  });
});

export const AuthController = {
  loginUser,
  signupUser,
  refreshToken,
};
