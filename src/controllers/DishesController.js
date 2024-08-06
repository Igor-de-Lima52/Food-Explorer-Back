const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesController{
  async create(req, res){
    const { title, description, ingredients, price, category } = req.body;
    const user_id = req.user.id;
    // const dishFileName = req.file.filename;

    // console.log(dishFileName);

    const diskStorage = new DiskStorage();
    const user = await knex("users").where({ id: user_id }).first();
    
    if(!user){
      throw new AppError("Only authenticated users can change the image", 401);
    }

    // const savedFileName = await diskStorage.saveFile(dishFileName);

    // const imageUrl = `http://localStorage:3333/files/${savedFileName}`;
    
    const [ dish_id ] = await knex("dishes").insert({
      title,
      description,
      // image: imageUrl,
      price,
      category
    });

    const ingredientsInsert = ingredients.map(name => {
      return{
        dish_id,
        name,
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    const dish = await knex("dishes").where({ id: dish_id}).first();

    res.json(201).json(dish);
  }
}

module.exports = DishesController;