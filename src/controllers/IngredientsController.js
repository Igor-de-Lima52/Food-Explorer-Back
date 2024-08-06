const knex = require("../database/knex");

class IngredientsController{
  async index(req, res){
    const dish_id = req.dish.id;

    const tags = await knex("tags").where({ dish_id }).groupBy("name");

    return res.json(tags);
  }
}

module.exports = IngredientsController;