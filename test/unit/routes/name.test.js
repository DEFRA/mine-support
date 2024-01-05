const claimName = require('../../../app/routes/claim/name')

jest.mock('../../../app/services/session-handler', () => {
  return {
    get: jest.fn().mockReturnValue({ accessible: true }),
    update: jest.fn()
  }
})

jest.mock('../../../app/schemas/name', () => {})

jest.mock('../../../app/routes/claim/models/name', () => {
  return jest.fn().mockImplementation(() => {})
})

describe('/claim/name', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should return success', async () => {
    const mockRequest = {}
    const mockH = {
      view: jest.fn()
    }

    await claimName[0].options.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalled()
  })

  test('should return success on POST', async () => {
    const mockRequest = {
      payload: {
        name: 'name'
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
    await claimName[1].options.handler(mockRequest, mockH)

    expect(mockH.redirect).toHaveBeenCalled()
  })

  test('on validation fail', async () => {
    const mockRequest = {
      payload: {
        name: 'name'
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

    await claimName[1].options.validate.failAction(mockRequest, mockH, {
      error: 'error'
    })

    expect(mockH.view).toHaveBeenCalled()
  })
})
