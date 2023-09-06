import { z } from "zod";

export const createBookValidation = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    author: z.string().min(1, { message: "Author is required" }),
    price: z.number().min(0.01, { message: "Price must be greater than 0" }),
    genre: z.string().min(1, { message: "Genre is required" }),
    publicationDate: z
      .string()
      .min(1, { message: "Publication date is required" }),
    categoryId: z.string().min(1, { message: "Category ID is required" }),
  }),
});
export const updateBookValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    price: z.number().optional(),
    genre: z.string().optional(),
    publicationDate: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});
