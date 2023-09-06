/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";
import {
  Filter,
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { bookSearchableField } from "./book.constant";
import { paginationHelper } from "../../../helpers/paginationHelper";

export const createBookService = async (data: Book): Promise<Book> => {
  return await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
};
export const getBookService = async (
  filters: Filter,
  options: Pagination,
): Promise<ResponseWithPagination<Book[]>> => {
  const { size, skip, sortOrder, sortBy, page } =
    paginationHelper.calculatePagination(options);

  const andConditions = [];

  const { category, minPrice, maxPrice, search, ...filterData } = filters;

  if (search) {
    andConditions.push({
      OR: bookSearchableField.map(field => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  if (category) {
    andConditions.push({
      categoryId: category as string,
    });
  }

  if (maxPrice && minPrice) {
    andConditions.push({
      price: {
        gte: Number(minPrice),
        lte: Number(maxPrice),
      },
    });
  } else if (maxPrice) {
    andConditions.push({
      price: {
        lte: Number(maxPrice), // Corrected to maxPrice
      },
    });
  } else if (minPrice) {
    andConditions.push({
      price: {
        gte: Number(minPrice), // Corrected to minPrice
      },
    });
  }

  const whereConditions: Prisma.BookWhereInput = andConditions?.length
    ? { AND: andConditions }
    : {};

  const res = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy: {
      [sortBy as string]: sortOrder,
    },
    include: {
      category: true,
    },
  });

  const total = await prisma.book.count();

  return {
    meta: {
      total,
      page,
      size,
    },
    data: res,
  };
};

export const getBookByIdService = async (id: string): Promise<Book> => {
  const res = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  if (!res) {
    throw new ApiError(
      "Failed to retrived Book by given id",
      httpStatus.NOT_FOUND,
    );
  }

  return res;
};

export const updateBookByIdService = async (
  id: string,
  data: Partial<Book>,
): Promise<Book> => {
  const res = await prisma.book.update({
    where: {
      id,
    },
    data,
  });

  if (!res) {
    throw new ApiError(
      "Failed to update Book by given id",
      httpStatus.NOT_FOUND,
    );
  }

  return res;
};
export const deleteBookByIdService = async (id: string): Promise<Book> => {
  const res = await prisma.book.delete({
    where: {
      id,
    },
  });

  if (!res) {
    throw new ApiError(
      "Failed to delete Book by given id",
      httpStatus.NOT_FOUND,
    );
  }

  return res;
};
