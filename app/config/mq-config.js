const joi = require('joi')

const mqSchema = joi.object({
  messageQueue: {
    host: joi.string(),
    useCredentialChain: joi.bool().default(false),
    type: joi.string(),
    appInsights: joi.object()
  },
  claimQueue: {
    address: joi.string(),
    username: joi.string(),
    password: joi.string(),
    suffix: joi.string().allow('')
  }
})

const mqConfig = {
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST,
    useCredentialChain: process.env.NODE_ENV === 'production',
    type: 'queue',
    appInsights: process.env.NODE_ENV === 'production' ? require('applicationinsights') : undefined
  },
  claimQueue: {
    name: process.env.CLAIM_QUEUE_NAME,
    address: process.env.CLAIM_QUEUE_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD,
    suffix: process.env.MESSAGE_QUEUE_SUFFIX
  }
}

const mqResult = mqSchema.validate(mqConfig, {
  abortEarly: false
})

if (mqConfig.claimQueue.suffix) {
  mqConfig.claimQueue.address = `${mqConfig.claimQueue.address}${mqConfig.claimQueue.suffix}`
}

// Throw if config is invalid
if (mqResult.error) {
  throw new Error(`The message queue config is invalid. ${mqResult.error.message}`)
}

const claimQueueConfig = { ...mqResult.value.messageQueue, ...mqResult.value.claimQueue }

module.exports = {
  claimQueueConfig
}
