import { Order } from "@prisma/client";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import * as OrderService from "./order.service";
import httpStatus from "../../../shared/httpStatus";
import { Request, Response } from "express";

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrderService(req.body);

  sendResponse<Order>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created Order",
    data: result,
  });
});
export const getOrder = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user as OrderService.UserInfo;
  const result = await OrderService.getOrderService(userInfo);

  sendResponse<Order[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved Order",
    data: result,
  });
});

export const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user as OrderService.UserInfo;

  const result = await OrderService.getOrderByIdService(
    req.params.id,
    userInfo,
  );

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved Order by id",
    data: result,
  });
});
