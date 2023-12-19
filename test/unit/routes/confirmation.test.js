const confirmation = require('../../../app/routes/claim/confirmation')

jest.mock('../../../app/services/session-handler', () => {
  return {
    get: jest.fn().mockReturnValue({ accessible: true }),
    update: jest.fn()
  }
})

jest.mock('../../../app/routes/claim/models/confirmation', () => {
  return jest.fn().mockImplementation(() => {})
})

describe('/claim/confirmation', () => {
  test('should return success', async () => {
    const mockRequest = {}
    const mockH = {
      view: jest.fn()
    }

    await confirmation.options.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalled()
  })
})
