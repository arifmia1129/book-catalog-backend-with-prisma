/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";

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
