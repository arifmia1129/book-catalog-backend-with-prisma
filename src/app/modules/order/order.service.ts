/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";

export const createOrderService = async (data: Order): Promise<Order> => {
  const { orderedBooks } = data;

  const jsonOrderedBooks = orderedBooks as Prisma.JsonArray;

  data.orderedBooks = jsonOrderedBooks;

  return await prisma.order.create({
    data,
  });
};
export const getOrderService = async (): Promise<Order[]> => {
  return await prisma.order.findMany();
};

export const getOrderByIdService = async (id: string): Promise<Order> => {
  const res = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  if (!res) {
    throw new ApiError(
      "Failed to retrived Order by given id",
      httpStatus.NOT_FOUND,
    );
  }

  return res;
};
