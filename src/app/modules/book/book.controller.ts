import { Book } from "@prisma/client";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import * as bookService from "./book.service";
import httpStatus from "../../../shared/httpStatus";
import { Request, Response } from "express";

export const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.createBookService(req.body);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved Book",
    data: result,
  });
});
export const getBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.getBookService();

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved Book",
    data: result,
  });
});

export const getBookById = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.getBookByIdService(req.params.id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved Book by id",
    data: result,
  });
});

export const updateBookById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await bookService.updateBookByIdService(
      req.params.id,
      req.body,
    );

    sendResponse<Book>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully updated Book by id",
      data: result,
    });
  },
);
export const deleteBookById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await bookService.deleteBookByIdService(req.params.id);

    sendResponse<Book>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully deleted Book by id",
      data: result,
    });
  },
);
