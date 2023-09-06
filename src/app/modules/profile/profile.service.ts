import { User } from "@prisma/client";
import { UserInfo } from "../order/order.service";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";

export const getUserProfileService = async (
  userInfo: UserInfo,
): Promise<Omit<User, "password">> => {
  const res = await prisma.user.findUnique({
    where: {
      id: userInfo.userId,
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
      "Failed to retrieve user profile by id",
      httpStatus.NOT_FOUND,
    );
  }

  return res;
};
