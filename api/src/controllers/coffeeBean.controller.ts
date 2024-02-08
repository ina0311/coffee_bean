import type { Request, Response } from 'express'
import { Models } from '../models/index'
import catchAsync from '../utils/catchAsync'
// import * as coffeeBeanService from "../services/"
import * as StoreService from "../services/store.service"
import * as CountryService from "../services/country.service"
import httpStatus from 'http-status'


export const create = catchAsync(async (req: Request, res: Response) => {
  const {storePlaceId, country, name, roast, process, minAltitude, maxAltitude, price} = req.body
  const store = await StoreService.findOrCreate(storePlaceId)
  const countryInstance = await CountryService.findOrCreate(country)
  const coffeeBean = await Models.CoffeeBean.create({
    name,
    roast,
    process,
    price,
    minAltitude,
    maxAltitude,
    storeId: store?.id,
    countryId: countryInstance?.id
  })
  res.status(httpStatus.CREATED).send(coffeeBean)
})


export const findOneById = catchAsync(async (req: Request, res: Response) => {
  const coffeeBean = await Models.CoffeeBean.findByPk(
    req.params.id,
    {
      include: [
        {model: Models.Store, as: 'store'},
        {model: Models.Country, as: 'country'}
      ]
    }
  )
  if (!coffeeBean) {
    res.status(httpStatus.NOT_FOUND).send('Not found')
    return
  }
  res.status(httpStatus.OK).send(coffeeBean)
})
