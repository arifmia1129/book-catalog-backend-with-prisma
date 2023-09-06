import { z } from "zod";

export const createCategoryValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: "Category title is required",
    }),
  }),
});
export const updateCategoryValidation = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});
