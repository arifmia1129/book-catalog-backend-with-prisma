import { Category } from "@prisma/client";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import * as CategoryService from "./category.service";
import httpStatus from "../../../shared/httpStatus";
import { Request, Response } from "express";

export const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.createCategoryService(req.body);

    sendResponse<Category>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Successfully created Category",
      data: result,
    });
  },
);
export const getCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getCategoryService();

  sendResponse<Category[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved Category",
    data: result,
  });
});

export const getCategoryById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.getCategoryByIdService(req.params.id);

    sendResponse<Category>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully retrieved Category by id",
      data: result,
    });
  },
);

export const updateCategoryById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.updateCategoryByIdService(
      req.params.id,
      req.body,
    );

    sendResponse<Category>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully updated Category by id",
      data: result,
    });
  },
);
export const deleteCategoryById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.deleteCategoryByIdService(
      req.params.id,
    );

    sendResponse<Category>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully deleted Category by id",
      data: result,
    });
  },
);
