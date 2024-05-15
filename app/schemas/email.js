const Joi = require('joi')

module.exports = Joi.object({
  email: Joi.string().required().email({minDomainSegments: 2})
})
