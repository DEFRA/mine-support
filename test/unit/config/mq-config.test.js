const joi = require('joi')
jest.mock('joi')

describe('Test mqSchema validation', () => {
  beforeEach(() => {
    joi.object.mockClear()
  })

  test('should return valid config', () => {
    joi.string = jest.fn().mockImplementation(() => {
      return {
        required: jest.fn().mockReturnThis(),
        optional: jest.fn().mockReturnThis(),
        default: jest.fn().mockReturnThis()
      }
    })

    joi.bool = jest.fn().mockImplementation(() => {
      return {
        default: jest.fn().mockReturnValue(false)
      }
    })

    joi.object.mockReturnValue({
      validate: () => ({
        value: {
          claimQueueConfig: {
            host: 'process.env.MESSAGE_QUEUE_HOST',
            useCredentialChain: false,
            managedIdentityClientId: 'id',
            type: 'queue',
            appInsights: undefined,
            name: 'ffc-demo-claim-service-calculation',
            address: 'process.env.CALCULATION_QUEUE_ADDRESS',
            username: 'process.env.MESSAGE_QUEUE_USER',
            password: 'process.env.MESSAGE_QUEUE_PASSWORD'
          }
        },
        error: null
      })
    })

    const { claimQueueConfig } = require('../../../app/config/mq-config')

    expect(claimQueueConfig).toBeDefined()
  })
})
