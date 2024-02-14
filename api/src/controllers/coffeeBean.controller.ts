import type { Request, Response } from 'express'
import httpStatus from 'http-status'
import { Models } from '../models/index'
import catchAsync from '../utils/catchAsync'
import {
  coffeeBeanService,
  storeService,
  countryService,
} from "../services"
import type { LoggedRequest } from 'src/middlewares/authenticate'

export const findAll = catchAsync(async (req: Request, res: Response) => {
  const coffeeBeans = await Models.CoffeeBean.findAll({
    include: [
      {model: Models.Store, as: 'store'},
      {model: Models.Country, as: 'country'}
    ]
  })
  res.status(httpStatus.OK).send(coffeeBeans)
})

export const create = catchAsync(async (req: Request, res: Response) => {
  const {storePlaceId, country, name, roast, process, minAltitude, maxAltitude, price} = req.body
  const store = await storeService.findOrCreate(storePlaceId)
  const countryInstance = await countryService.findOrCreate(country)
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
  ).catch((e) => {
    console.error(e)
  })
  if (!coffeeBean) {
    res.status(httpStatus.NOT_FOUND).send('Not found')
    return
  }
  res.status(httpStatus.OK).send(coffeeBean)
})

export const createReview = catchAsync(async (req: LoggedRequest, res: Response) => {
  const userId = req.userId!
  const coffeeBeanId = req.params.id
  const {coffeeStyle, total, acidity, bitterness, body, afterTaste, describe} = req.body
  const userBean = await coffeeBeanService.userCoffeeBeanFindOrCreate(userId, +coffeeBeanId)
  if (!userBean) {
    res.status(httpStatus.NOT_FOUND).send('Not found')
    return
  }

  const review = await Models.Review.create({
    userBeanId: userBean.id,
    coffeeStyle,
    total,
    acidity,
    bitterness,
    body,
    afterTaste,
    describe
  }).catch((e) => {
    debugger
    console.error(e)
  })
  
  res.status(httpStatus.CREATED).send(review)
})
