import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const coffeeBeanSchema = z.object({
  name: z.string().min(3),
  storeId: z.number(),
  countryId: z.number(),
  farmId: z.number(),
  minAltitude: z.number(),
  maxAltitude: z.number(),
  breedType: z.number(),
  process: z.number(),
  roast: z.number(),
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