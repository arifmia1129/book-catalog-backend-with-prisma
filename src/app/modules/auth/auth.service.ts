/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";
import { LoginCredential, LoginResponse } from "./auth.interface";
import config from "../../../config";
import * as jwtHelper from "../../../helpers/jwtHelper";
import { Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";

export const signupUserAuthService = async (payload: User): Promise<User> => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  payload.password = hashedPassword;

  return await prisma.user.create({
    data: payload,
  });
};
export const signinUserAuthService = async (
  payload: LoginCredential,
): Promise<LoginResponse> => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError("User does not exist", httpStatus.NOT_FOUND);
  }

  if (!isUserExist?.password) {
    throw new ApiError("Invalid user information.", httpStatus.BAD_REQUEST);
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password,
  );

  if (!isPasswordMatched) {
    throw new ApiError("Invalid ID or Password", httpStatus.FORBIDDEN);
  }

  const { email: userEmail, role } = isUserExist;

  const accessToken = jwtHelper.createToken(
    { userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string,
  );

  const refreshToken = jwtHelper.createToken(
    { userEmail, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};
