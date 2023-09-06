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

export const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUserByIdService(req.params.id);

  sendResponse<Omit<User, "password">>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved user by id",
    data: result,
  });
});

export const updateUserById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await userService.updateUserByIdService(
      req.params.id,
      req.body,
    );

    sendResponse<Omit<User, "password">>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully updated user by id",
      data: result,
    });
  },
);
export const deleteUserById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await userService.deleteUserByIdService(req.params.id);

    sendResponse<Omit<User, "password">>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully deleted user by id",
      data: result,
    });
  },
);
