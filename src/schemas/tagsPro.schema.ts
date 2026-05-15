import { z } from "zod";

const TagSchema = z.object({
  id: z.number(),
  time_stamp: z.string(),
  tag: z.string(),
  prensa: z.string(), // puede ser vacío o un número en string
  proceso: z.number(),
  parte: z.number(),
  cavidad: z.array(z.string()),
  product: z.array(z.string()),
  defecto: z.array(z.string()),
  zona: z.array(z.string()),
  procesoDetectado: z.array(z.string()),
  status: z.array(z.string()),
  rwFechaRecibe: z.array(z.string().nullable()),
  rwFechaLibera: z.array(z.string().nullable()),
  qcFechaLibera: z.array(z.string().nullable()),
  qcLibera: z.array(z.string().nullable()),
});

export const TagsResponseSchema = z.array(TagSchema);

export type TagsData = z.infer<typeof TagsResponseSchema>;
