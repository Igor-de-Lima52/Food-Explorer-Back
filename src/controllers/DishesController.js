const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesController{
  async create(req, res){
    const { title, description, ingredients, price, category} = req.body;
    const user_id = req.user.id;
    const dishFileName = req.file.filename;

    const diskStorage = new DiskStorage();
    const user = await knex("users").where({ id: user_id }).first();
    
    if(!user){
      throw new AppError("Only authenticated users can change the image", 401);
    }

    const savedFileName = await diskStorage.saveFile(dishFileName);

    const imageUrl = savedFileName;
    
    const [ dish_id ] = await knex("dishes").insert({
      title,
      description,
      image: imageUrl,
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

    const dish = await knex("dishes").where({ id: dish_id }).first();

    res.json(201).json(dish);
  }
  async update(req, res){
    const { id } = req.params;
    const { title, description, ingredients, price, category } = req.body;
    const user_id = req.user.id;

    const diskStorage = new DiskStorage();
    const user = await knex("users").where({ id: user_id }).first();
    
    if(!user){
      throw new AppError("Only authenticated users can change the image", 401);
    }

    const dish = await knex("dishes").where({ id }).first();

    if(!dish){
      throw new AppError("Dish not found", 404);
    }
    let imageUrl = dish.image;
    if (req.file) {
      const dishFileName = req.file.filename;
      if(dish.image){
       await diskStorage.deleteFile(dish.image); 
      }
      const savedFileName = await diskStorage.saveFile(dishFileName);
      imageUrl = savedFileName;
    }
  
    await knex("dishes").where({ id })
    .update({ 
      title, 
      description, 
      image: imageUrl,
      price,
      category
    });

    if(ingredients && ingredients.length > 0){
      await knex("ingredients").where({ dish_id: id }).delete();

      const ingredientsInsert = ingredients.map(name => {
        return{
          dish_id: id,
          name,
        };
      });

      await knex("ingredients").insert(ingredientsInsert);
    }

    const updatedDish = await knex("dishes").where({ id }).first();

    res.status(200).json(updatedDish);
  }
  async show(req, res){
    const { id } = req.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");

    return res.json({
      ...dish,
      ingredients
    });
  }
  async delete(req, res){
    const { id }= req.params;

    await knex("dishes").where({ id }).delete();

    return res.json();
  }
  async index(req, res){
    const { title, ingredients } = req.query;
    
    let dishes;

    if(title){
      dishes = await knex("dishes")
      .whereLike("title", `%${title}%`)
      .orderBy("id");
    }
    else if((!dishes || dishes.length === 0) && ingredients){
    //   // const filterIngredients = ingredients.split(",").map(ingredient => ingredient.trim());
    //   console.log(ingredients);

      dishes = await knex("ingredients")
      .select(["dishes.id","dishes.title", "dishes.price", "dishes.description", "dishes.category", "dishes.image"])
      .whereLike("dishes.title", `%${title}%`)
      .whereLike("ingredients.name", `%${ingredients}%`)
      .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
      .groupBy("dishes.id")
      .orderBy("dishes.title")
    }
    else{
      dishes = await knex("dishes").orderBy("id");
    }

    const dish = dishes.map(({ id, title, description, price, category, image }) => {
      return{
        id,
        title,
        description,
        price,
        category,
        image
      }
    });
    // console.log(dish);
    return res.json(dish);
  }
}

module.exports = DishesController;