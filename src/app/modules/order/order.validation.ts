import { z } from "zod";

const OrderStatusEnum = z.enum(["pending", "shipped", "delivered"]);

export const createOrderValidation = z.object({
  body: z.object({
    userId: z.string({
      required_error: "User Id is required",
    }),
    orderedBooks: z.array(
      z.object({
        bookId: z.string(),
        quantity: z.number(),
      }),
    ),
  }),
});
export const updateOrderValidation = z.object({
  body: z.object({
    userId: z.string().optional(),
    orderedBooks: z.array(
      z
        .object({
          bookId: z.string().optional(),
          quantity: z.number().optional(),
        })
        .optional(),
    ),
    status: OrderStatusEnum.optional(),
  }),
});
