import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, ISignupUser } from './auth.interface';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully!',
    data: others,
  });
});

const signupUser = catchAsync(async (req, res) => {
  const result = await AuthService.signupUser(req.body);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', result.token.refreshToken, cookieOptions);

  sendResponse<ISignupUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User created successfully!',
    data: { data: result.data, token: result.token },
  });
});

export const AuthController = {
  loginUser,
  signupUser,
};
