import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class HousesService {

  async getHouses() {
    const houses = await dbContext.Houses.find()
    return houses
  }

  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId)

    if (!house) {
      throw new BadRequest('No house with that id')
    }
    return house
  }


  async createHouse(houseData) {
    const house = dbContext.Houses.create(houseData)
    return house
  }

  async removeHouse(houseId, userId) {
    const houseToDelete = await this.getHouseById(houseId)

    if (houseToDelete.creatorId.toString() != userId) {
      throw new Forbidden("Hey! You can't do that!")
    }
    await houseToDelete.remove()
  }

  async editHouse(houseId, userId, houseData) {
    const originalHouse = await this.getHouseById(houseId)

    if (originalHouse.creatorId.toString() != userId) {
      throw new Forbidden('Hey! Get out of here!')
    }

    originalHouse.year = houseData.year || originalHouse.year
    originalHouse.numOfBeds = houseData.numOfBeds || originalHouse.numOfBeds
    originalHouse.numOfBaths = houseData.numOfBaths || originalHouse.numOfBaths
    originalHouse.squareFeet = houseData.squareFeet || originalHouse.squareFeet
    originalHouse.price = houseData.price || originalHouse.price

    await originalHouse.save()
    return originalHouse
  }
}

export const housesService = new HousesService()