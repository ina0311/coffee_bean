import {Models} from "../models"
import Attributes from "../models/review"
export const createBeanFlavorWithReview = async (userId: number, coffeeBeanId: number, flavorIds: number[], reviewAttributes: Attributes) => {
  const [userCoffeeBean, _isCreated] = await Models.UserCoffeeBean.findOrCreate({
    where: {
      userId: userId,
      coffeeBeanId: coffeeBeanId
    }
  })
  const userBeanId = userCoffeeBean.id
  const review = await Models.Review.create({
    userBeanId,
    coffeeStyle: 0,
    total: reviewAttributes.total,
    acidity: reviewAttributes.acidity,
    bitterness: reviewAttributes.bitterness,
    body: reviewAttributes.body,
    afterTaste: reviewAttributes.afterTaste,
    describe: reviewAttributes.describe
  })

  return review
}