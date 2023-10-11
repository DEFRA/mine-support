const Joi = require('joi')

module.exports = Joi.object({
  propertyType: Joi.any().required().valid('home', 'business')
})
