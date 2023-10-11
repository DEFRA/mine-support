const Joi = require('joi')

module.exports = Joi.object({
  mineType: Joi.array().single().items(
    Joi.any().valid('gold', 'coal', 'iron', 'other')
  ).required()
})
