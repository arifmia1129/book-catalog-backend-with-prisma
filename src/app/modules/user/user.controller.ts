import { User } from "@prisma/client";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import * as userService from "./user.service";
import httpStatus from "../../../shared/httpStatus";
import { Request, Response } from "express";

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUserService();

  sendResponse<Omit<User, "password">[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved user",
    data: result,
  });
});
