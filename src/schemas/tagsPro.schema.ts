import { z } from "zod";

const TagSchema = z.object({
  id: z.number(),
  time_stamp: z.string(),
  tag: z.string(),
  prensa: z.string(), // puede ser vacío o un número en string
  proceso: z.number(),
  parte: z.number(),
});

export const TagsResponseSchema = z.array(TagSchema);

export type TagsData = z.infer<typeof TagsResponseSchema>;
