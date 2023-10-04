import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import * as userAuthService from "./auth.service";
import httpStatus from "../../../shared/httpStatus";
import sendResponse from "../../../shared/sendResponse";
import config from "../../../config";
import { User } from "@prisma/client";
import signinResponse from "../../../shared/signinResponse";

export const signupUserAuth = catchAsync(
  async (req: Request, res: Response) => {
    const result = await userAuthService.signupUserAuthService(req.body);

    sendResponse<Omit<User, "password">>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully create a new user",
      data: result,
    });
  },
);
export const signinUserAuth = catchAsync(
  async (req: Request, res: Response) => {
    const result = await userAuthService.signinUserAuthService(req.body);

    const { refreshToken, ...other } = result;

    // set refresh token to cookie
    const cookieOption = {
      secret: config.env === "production",
      httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOption);

    signinResponse<string>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User signin successfully!",
      token: other.accessToken,
    });
  },
);
