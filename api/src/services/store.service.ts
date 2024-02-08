import {Models} from "../models"
import * as googleMap from "./googleMap"


export const findOrCreate = async (placeId: string) => {
  const result = await Models.Store.findOne({where: {placeId}})
  if (result) return result

  const response = await googleMap.placeDetail(placeId)
  const {name, formatted_address, geometry} = response.result
  const {lat, lng} = geometry.location
  const postalCode = formatted_address.match(/\d{3}-\d{4}/)[0]
  const address = formatted_address.replace(postalCode, "")
  return await Models.Store.create({name, placeId, latitude: lat, longitude: lng, postalCode: postalCode, address: address})
}