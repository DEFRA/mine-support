const propertyType = require('../../../app/routes/claim/property-type')

jest.mock('../../../app/services/session-handler', () => {
  return {
    get: jest.fn().mockReturnValue({ accessible: true }),
    update: jest.fn()
  }
})

jest.mock('../../../app/schemas/property-type', () => {})

jest.mock('../../../app/routes/claim/models/property-type', () => {
  return jest.fn().mockImplementation(() => {})
})

describe('/claim/property-type', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should return success', async () => {
    const mockRequest = {}
    const mockH = {
      view: jest.fn()
    }

    await propertyType[0].options.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalled()
  })

  test('should return success on POST', async () => {
    const mockRequest = {
      payload: {
        propertyType: 'type'
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
    await propertyType[1].options.handler(mockRequest, mockH)

    expect(mockH.redirect).toHaveBeenCalled()
  })

  test('on validation fail', async () => {
    const mockRequest = {
      payload: {
        propertyType: 'type'
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

    await propertyType[1].options.validate.failAction(mockRequest, mockH, {
      error: 'error'
    })

    expect(mockH.view).toHaveBeenCalled()
  })
})
