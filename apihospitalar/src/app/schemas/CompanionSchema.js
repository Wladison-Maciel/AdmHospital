import { z } from 'zod';

export const showCompanionParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, { message: "ID must be a number" }),
  patient_id: z.string().regex(/^\d+$/, { message: "Patient ID must be a number" })
});
