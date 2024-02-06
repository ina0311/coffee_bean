import type { Request, Response } from 'express'
import { Models } from '../models/index'
import catchAsync from '../utils/catchAsync'
// import * as coffeeBeanService from "../services/"
import * as StoreService from "../services/store.service"
import httpStatus from 'http-status'


export const create = catchAsync(async (req: Request, res: Response) => {
  const {storePlaceId, country, name, roast, process, minAltitude, maxAltitude, price} = req.body
  const store = await StoreService.findOrCreate(storePlaceId)
  debugger
  const [countryInstance, _isCreated] = await Models.Country.findOrCreate({
    where: {
      isoCode: country.alpha3Code,
      name: country.englishName,
      japaneseName: country.japaneseName,
      flagImage: country.flag,
      googleMapUrl: country.googleMap,
    }
  })
  const coffeeBean = await Models.CoffeeBean.create({
    name,
    roast,
    process,
    price,
    minAltitude,
    maxAltitude,
    storeId: store.id,
    countryId: countryInstance.id
  })
  res.status(httpStatus.CREATED).send(coffeeBean)
})

