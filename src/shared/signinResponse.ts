import { Response } from "express";

type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | number | null;
  token?: T | null;
};

const signinResponse = <T>(res: Response, data: ApiResponse<T>) => {
  const responseMsg: ApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    token: data.token || null,
  };

  res.status(data.statusCode).json(responseMsg);
};

export default signinResponse;
