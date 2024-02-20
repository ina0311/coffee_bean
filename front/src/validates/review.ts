import { z } from 'zod'

export const reviewSchema = z.object({
  coffeeStyle: z.string(),
  total: z.number().min(0).max(5),
  acidity: z.number().min(0).max(5),
  bitterness: z.number().min(0).max(5),
  body: z.number().min(0).max(5),
  afterTaste: z.number().min(0).max(5),
  flavorIds: z.array(z.string()),
  describe: z.string().optional(),
})

export type reviewSchemaType = z.infer<typeof reviewSchema>

