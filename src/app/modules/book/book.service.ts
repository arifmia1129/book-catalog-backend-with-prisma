/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";

export const createBookService = async (data: Book): Promise<Book> => {
  return await prisma.book.create({
    data,
  });
};
export const getBookService = async (): Promise<Book[]> => {
  return await prisma.book.findMany();
};

export const getBookByIdService = async (id: string): Promise<Book> => {
  const res = await prisma.book.findUnique({
    where: {
      id,
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
