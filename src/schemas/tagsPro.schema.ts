import { z } from "zod";

const PressItemSchema = z.object({
  pk1: z.number(),
  prensa: z.number(),
  tiro: z.number(),
  indice: z.number(),
  g3b_c2: z.number(),
  g5d_c1: z.number(),
  g5d_c3: z.number(),
  g5d_c4: z.number(),
  inicio: z.string().optional().nullable(),
  final: z.string().optional().nullable(),
});

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
  supplierName: z.string().nullable(),
  serie: z.string().nullable(),
  boxId: z.number().nullable(),
});

export const TagsResponseSchema = z.object({
  data: z.array(TagSchema).optional().nullable(),
  DataPressGrouped: z.record(z.string(), z.array(PressItemSchema).nullable()),
});

export type TagsData = z.infer<typeof TagsResponseSchema>;

export const FestoonData = z.object({
  supplierName: z.string(),
  serie: z.string(),
});

/* const PressItemSchemaFilter = z.object({
  pk1: z.number(),
  prensa: z.number(),
  tiro: z.number(),
  indice: z.number(),
  g3b_c2: z.number().optional(),
  g5d_c1: z.number().optional(),
  g5d_c3: z.number().optional(),
  g5d_c4: z.number().optional(),
  inicio: z.string().optional().nullable(),
  final: z.string().optional().nullable(),
}); */

/* const PressGroupSchema = z.record(z.string(), z.array(PressItemSchema));
const PressGroupSchemaFilter = z.record(
  z.string(),
  z.array(PressItemSchemaFilter),
); */

export const PressDataSchema = z.record(z.string(), z.array(PressItemSchema));
export type PressDataS = z.infer<typeof PressDataSchema>;
export type PressItem = z.infer<typeof PressItemSchema>;
