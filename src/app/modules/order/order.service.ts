/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";

type IOrderedBooks = Order & {
  orderedBooks: IBook[];
};

export type UserInfo = {
  userId: string;
  role: string;
};

type IBook = {
  bookId: string;
  quantity: number;
};

export const createOrderService = async (
  data: IOrderedBooks,
): Promise<Order | null> => {
  const newOrder = await prisma.$transaction(async tx => {
    const { orderedBooks, ...other } = data;

    const res = await tx.order.create({
      data: other,
    });

    if (!res) {
      throw new ApiError("Failed to create order", httpStatus.BAD_REQUEST);
    }

    for (const book of orderedBooks) {
      const insertBookInfo = await tx.orderedBook.create({
        data: {
          orderId: res.id,
          bookId: book.bookId,
          quantity: book.quantity,
        },
      });

      if (!insertBookInfo) {
        throw new ApiError("Failed to take this order", httpStatus.BAD_REQUEST);
      }
    }

    return res;
  });

  if (!newOrder) {
    throw new ApiError("Order couldn't created", httpStatus.BAD_REQUEST);
  }
  return await prisma.order.findUnique({
    where: {
      id: newOrder.id,
    },
    include: {
      orderedBooks: {
        include: {
          book: true,
        },
      },
    },
  });
};
export const getOrderService = async (
  userInfo: UserInfo,
): Promise<Order[] | null> => {
  const { role, userId } = userInfo;

  let res;

  if (role === "admin") {
    res = await prisma.order.findMany({
      include: {
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });
  }

  if (role === "customer") {
    res = await prisma.order.findMany({
      where: { userId },
      include: {
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });
  }

  if (!res) {
    throw new ApiError("Order does not exist", httpStatus.NOT_FOUND);
  }

  return res;
};

export const getOrderByIdService = async (
  id: string,
  userInfo: UserInfo,
): Promise<Order> => {
  const { role, userId } = userInfo;

  const res = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      orderedBooks: {
        include: {
          book: true,
        },
      },
    },
  });

  if (!res) {
    throw new ApiError(
      "Failed to retrived Order by given id",
      httpStatus.NOT_FOUND,
    );
  }

  if (role === "customer" && res.userId !== userId) {
    throw new ApiError(
      "You are not authorized user to access this order. Try to retrieve your own order details",
      httpStatus.FORBIDDEN,
    );
  }

  return res;
};
