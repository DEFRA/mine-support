const Joi = require('joi')

module.exports = Joi.object({
  email: Joi.string().email()
  .min(3)
  .max(30)
})
