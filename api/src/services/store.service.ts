import {Models} from "../models"
import * as googleMap from "./googleMap"


export const findOrCreate = async (placeId: string) => {
  const result = await Models.Store.findOne({where: {placeId}})
  debugger
  if (result) return result

  const response = await googleMap.placeDetail(placeId)
  const {name, formatted_address} = response.result
  const postalCode = formatted_address.match(/\d{3}-\d{4}/)[0]
  const address = formatted_address.replace(postalCode, "")
  return await Models.Store.create({name, placeId, postalCode: postalCode, address: address})
}