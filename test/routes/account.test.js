describe('account page', () => {
  let createServer
  let server
  beforeAll(async () => {
    createServer = require('../../app/server')
  })
  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })
  test('GET /account returns unauthorised', async () => {
    const options = {
      method: 'GET',
      url: '/account'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(401)
  })
  afterEach(async () => {
    await server.stop()
    jest.clearAllMocks()
  })
  afterAll(async () => {
    jest.clearAllMocks()
  })
})
