jest.mock('../../../app/config', () => {
  return {
    config: {
      cacheName: 'test-cache-name',
      sessionTimeoutMinutes: 10,
      cookiePassword: 'test-cookie-password'
    }
  }
})

jest.mock('@hapi/yar')

describe('session cache plugin', () => {
  test('should register session cache', () => {
    const sessionCache = require('../../../app/plugins/session-cache')
    expect(sessionCache).toBeDefined()
  })
})
