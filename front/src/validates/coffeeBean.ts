import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const coffeeBeanSchema = z.object({
  name: z.string().min(3),
  roast: z.number(),
  storeId: z.number().optional(),
  countryId: z.number().optional(),
  farmId: z.number().optional(),
  minAltitude: z.number().optional(),
  maxAltitude: z.number().optional(),
  breedType: z.number().optional(),
  process: z.number().optional(),
})

const farmSchema = z.object({
  name: z.string().min(3),
  placeId: z.string(),
})

const countrySchema = z.object({
  name: z.string().min(3),
  placeId: z.string(),
  isoCode: z.string().min(3).max(3),
})

export const typedCoffeeBeanSchema = toTypedSchema(coffeeBeanSchema)
export const typedFarmSchema = toTypedSchema(farmSchema)
export const typedCountrySchema = toTypedSchema(countrySchema)