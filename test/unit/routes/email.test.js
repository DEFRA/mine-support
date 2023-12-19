const email = require('../../../app/routes/claim/email')

jest.mock('../../../app/services/session-handler', () => {
  return {
    get: jest.fn().mockReturnValue({ submitted: false }),
    update: jest.fn()
  }
})

jest.mock('../../../app/messaging/publish-claim', () =>
  jest.fn().mockResolvedValue()
)
jest.mock('../../../app/services/id-service', () => {
  return {
    generateId: jest.fn()
  }
})

jest.mock('../../../app/schemas/email', () => {})

jest.mock('../../../app/routes/claim/models/email', () => {
  return jest.fn().mockImplementation(() => {})
})

describe('/claim/email', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should return success', async () => {
    const mockRequest = {}
    const mockH = {
      view: jest.fn()
    }

    await email[0].options.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalled()
  })

  test('should return success on POST', async () => {
    const mockRequest = {
      payload: {
        claimId: 'claimId',
        email: 'email',
        submitted: false
      }
    }
    const mockH = {
      view: jest.fn(() => {
        return {
          takeover: jest.fn()
        }
      }),
      redirect: jest.fn()
    }
    await email[1].options.handler(mockRequest, mockH)

    expect(mockH.redirect).toHaveBeenCalled()
  })

  test('on validation fail', async () => {
    const mockRequest = {
      payload: {
        claimId: 'claimId',
        email: 'email',
        submitted: false
      }
    }
    const mockH = {
      view: jest.fn(() => {
        return {
          takeover: jest.fn()
        }
      }),
      redirect: jest.fn()
    }

    await email[1].options.validate.failAction(mockRequest, mockH, {
      error: 'error'
    })

    expect(mockH.view).toHaveBeenCalled()
  })
})
