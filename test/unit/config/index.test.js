const joi = require('joi')

joi.bool = jest.fn().mockImplementation(() => {
  return {
    default: jest.fn().mockReturnValue(false)
  }
})

joi.string = jest.fn().mockImplementation(() => {
  return {
    required: jest.fn().mockReturnThis(),
    optional: jest.fn().mockReturnThis(),
    default: jest.fn().mockReturnThis(),
    allow: jest.fn().mockReturnThis(),
    valid: jest.fn().mockReturnThis()
  }
})

joi.number = jest.fn().mockImplementation(() => {
  return {
    required: jest.fn().mockReturnThis(),
    optional: jest.fn().mockReturnThis(),
    default: jest.fn().mockReturnThis()
  }
})

const mockValidate = jest.fn().mockReturnValue({ error: null, value: {} })
joi.object = jest.fn().mockReturnValue({ validate: mockValidate })

jest.mock('../../../app/config/mq-config', () => {
  return 'mock object'
})

describe('config index', () => {
  test('should be a valid object', () => {
    process.env.COOKIE_PASSWORD = 'cookie_password_cookie_password'
    const config = require('../../../app/config/index')
    expect(config).toBeInstanceOf(Object)
  })
})
