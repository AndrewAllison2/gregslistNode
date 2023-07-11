import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";

export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getHouses)
      .get('/:id', this.getHouseById)
      .use(Auth0Provider.getAuthorizedUserInfo)

      .post('', this.createHouse)
      .delete('/:id', this.removeHouse)
      .put('/:id', this.editHouse)
  }

  async getHouses(req, res, next) {
    try {
      const houses = await housesService.getHouses()

      res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getHouseById(req, res, next) {
    try {
      const houseId = req.params.id

      const house = await housesService.getHouseById(houseId)
      res.send(house)

    } catch (error) {
      next(error)
    }
  }

  async createHouse(req, res, next) {
    try {
      const houseData = req.body
      houseData.creatorId = req.userInfo.id
      const createdHouse = await housesService.createHouse(houseData)
      res.send(createdHouse)
    } catch (error) {
      next(error)
    }
  }

  async removeHouse(req, res, next) {
    try {
      const houseId = req.params.id
      const userId = req.userInfo.id

      await housesService.removeHouse(houseId, userId)

      res.send('The house was sent to the farm!')
    } catch (error) {
      next(error)
    }
  }

  async editHouse(req, res, next) {
    try {
      const houseId = req.params.id
      const userId = req.userInfo.id
      const houseData = req.body

      const updatedHouse = await housesService.editHouse(houseId, userId, houseData)
      res.send(updatedHouse)
    } catch (error) {
      next(error)
    }
  }
}