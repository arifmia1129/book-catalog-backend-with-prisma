import { Book } from "@prisma/client";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import * as bookService from "./book.service";
import httpStatus from "../../../shared/httpStatus";
import { Request, Response } from "express";
import { bookFilterableField } from "./book.constant";
import pick from "../../../shared/pick";
import {
  Filter,
  Pagination,
} from "../../../interfaces/databaseQuery.interface";
import { paginationField } from "../../constant/pagination";

export const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.createBookService(req.body);

  sendResponse<Book>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully create Book",
    data: result,
  });
});
export const getBook = catchAsync(async (req: Request, res: Response) => {
  const filters: Filter = pick(req.query, bookFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await bookService.getBookService(filters, paginationOptions);

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved Book",
    meta: result.meta,
    data: result.data,
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
export const getBookByCategoryId = catchAsync(
  async (req: Request, res: Response) => {
    const result = await bookService.getBookByCategoryIdService(req.params.id);

    sendResponse<Book[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully retrieved Book by category id",
      data: result,
    });
  },
);

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
