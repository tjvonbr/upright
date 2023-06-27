import * as z from "zod";

export const getProgramSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});
