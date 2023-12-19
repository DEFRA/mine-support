const clearSession = require('../../../app/routes/clear-session')

jest.mock('../../../app/services/session-handler', () => {
  return {
    clear: jest.fn()
  }
})

describe('/claim/clear-session', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should return success', async () => {
    const mockRequest = {}
    const mockH = {
      redirect: jest.fn()
    }

    await clearSession.options.handler(mockRequest, mockH)

    expect(mockH.redirect).toHaveBeenCalled()
  })
})
