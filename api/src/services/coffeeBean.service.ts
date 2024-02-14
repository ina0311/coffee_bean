import {Models} from "../models"

export const userCoffeeBeanFindOrCreate = async (userId: number, coffeeBeanId: number) => {
  const [userCoffeeBean, _isCreated] = await Models.UserCoffeeBean.findOrCreate({
    where: {
      userId,
      coffeeBeanId
    }
  })
  return userCoffeeBean
}
