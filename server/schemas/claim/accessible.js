const Joi = require('@hapi/joi')

module.exports = Joi.object({
  accessible: Joi.boolean()
})
