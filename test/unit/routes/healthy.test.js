const healthy = require('../../../app/routes/healthy')

describe('/healthy', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should return success', async () => {
    const mockRequest = {}
    const mockH = {
      response: jest.fn(() => {
        return {
          code: jest.fn()
        }
      })
    }

    await healthy.options.handler(mockRequest, mockH)

    expect(mockH.response).toHaveBeenCalled()
  })
})
