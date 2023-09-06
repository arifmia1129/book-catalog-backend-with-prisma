import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserInfo } from "../order/order.service";
import { getUserProfileService } from "./profile.service";
import { User } from "@prisma/client";
import httpStatus from "../../../shared/httpStatus";
import sendResponse from "../../../shared/sendResponse";

export const getUserProfile = catchAsync(
  async (req: Request, res: Response) => {
    const userInfo = req.user as UserInfo;
    const result = await getUserProfileService(userInfo);

    sendResponse<Omit<User, "password">>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully get user profile",
      data: result,
    });
  },
);
