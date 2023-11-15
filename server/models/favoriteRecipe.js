const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const favoriteRecipeSchema = new Schema({
  idMeal: Schema.Types.String,
  AddedOn: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
          }
             
})

const favoriteRecipe = model('favoriteRecipe', favoriteRecipeSchema)

module.exports = favoriteRecipe

