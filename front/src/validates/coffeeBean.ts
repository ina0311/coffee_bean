import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const coffeeBeanSchema = z.object({
  name: z.string().min(3),
  price: z.number(),
  roast: z.string(),
  storePlaceId: z.string().optional(),
  country: z.object({
    name: z.string().min(3),
    japaneseName: z.string(),
    alpha3Code: z.string().min(3).max(3),
    flagImage: z.string(),
    googleMapUrl: z.string(),
  }).optional(),
  minAltitude: z.number().optional(),
  maxAltitude: z.number().optional(),
  flavor: z.array(z.string()).optional(),
  process: z.string().optional(),
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