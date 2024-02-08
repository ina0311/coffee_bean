import {Models} from "../models"

export const findOrCreate = async (country: any | undefined) => {
  if (!country) return
  const [countryInstance, _isCreated] = await Models.Country.findOrCreate({
    where: {
      isoCode: country.alpha3Code,
      name: country.englishName,
      japaneseName: country.japaneseName,
      flagImage: country.flag,
      googleMapUrl: country.googleMap,
    }
  })
  return countryInstance
}