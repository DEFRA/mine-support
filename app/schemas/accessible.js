const Joi = require('joi')

module.exports = Joi.object({
  accessible: Joi.boolean().required()
})
