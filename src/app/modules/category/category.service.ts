/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";

export const createCategoryService = async (
  data: Category,
): Promise<Category> => {
  return await prisma.category.create({
    data,
  });
};
export const getCategoryService = async (): Promise<Category[]> => {
  return await prisma.category.findMany();
};

export const getCategoryByIdService = async (id: string): Promise<Category> => {
  const res = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });

  if (!res) {
    throw new ApiError(
      "Failed to retrived Category by given id",
      httpStatus.NOT_FOUND,
    );
  }

  return res;
};

export const updateCategoryByIdService = async (
  id: string,
  data: Partial<Category>,
): Promise<Category> => {
  const res = await prisma.category.update({
    where: {
      id,
    },
    data,
  });

  if (!res) {
    throw new ApiError(
      "Failed to update Category by given id",
      httpStatus.NOT_FOUND,
    );
  }

  return res;
};
export const deleteCategoryByIdService = async (
  id: string,
): Promise<Category> => {
  const res = await prisma.category.delete({
    where: {
      id,
    },
  });

  if (!res) {
    throw new ApiError(
      "Failed to delete Category by given id",
      httpStatus.NOT_FOUND,
    );
  }

  return res;
};
