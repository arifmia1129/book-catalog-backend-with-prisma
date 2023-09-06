/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";

export const getUserService = async (): Promise<Omit<User, "password">[]> => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
};

export const getUserByIdService = async (
  id: string,
): Promise<Omit<User, "password">> => {
  const res = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  if (!res) {
    throw new ApiError(
      "Failed to retrived user by given id",
      httpStatus.NOT_FOUND,
    );
  }

  return res;
};

export const updateUserByIdService = async (
  id: string,
  data: Partial<User>,
): Promise<Omit<User, "password">> => {
  const res = await prisma.user.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  if (!res) {
    throw new ApiError(
      "Failed to update user by given id",
      httpStatus.NOT_FOUND,
    );
  }

  return res;
};
