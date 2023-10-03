describe('Date of Subsidence test', () => {
  let createServer
  let server

  beforeAll(async () => {
    createServer = require('../../../../../app/server')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET /claim/date-of-subsidence route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/claim/date-of-subsidence'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('GET /claim/date-of-subsidence returns as error if date subsidence is invalid', async () => {
    const options = {
      method: 'POST',
      url: '/claim/date-of-subsidence',
      payload: { month: '01', day: '01' }
    }

    const postResponse = await server.inject(options)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Please select a valid date')
  })

  test('GET /claim/date-of-subsidence returns as error if date subsidence is in the future', async () => {
    const options = {
      method: 'POST',
      url: '/claim/date-of-subsidence',
      payload: { year: '2098', month: '01', day: '01' }
    }

    const postResponse = await server.inject(options)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Date has to be in the past')
  })

  test('GET /claim/date-of-subsidence redirects to next page, if date subsidence is in the past', async () => {
    const options = {
      method: 'POST',
      url: '/claim/date-of-subsidence',
      payload: { year: '2021', month: '01', day: '01' }
    }

    const postResponse = await server.inject(options)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('./mine-type')
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await server.stop()
  })
})
