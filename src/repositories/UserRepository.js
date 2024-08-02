const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UserRepository{
  async findByEmail(email){
    const checkUserExists = await knex("users").where({ email });
    
    if(checkUserExists.length > 0){
      throw new AppError("This e-mail is already in use.");
    }

    return checkUserExists;
  }
  async create({ name, email, password }){
    const userId = await knex("users").insert({ name, email, password });

    return { id: userId };
  }
}

module.exports = UserRepository;