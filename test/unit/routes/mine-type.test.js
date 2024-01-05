const mineType = require('../../../app/routes/claim/mine-type')

jest.mock('../../../app/services/session-handler', () => {
  return {
    get: jest.fn().mockReturnValue({ accessible: true }),
    update: jest.fn()
  }
})

jest.mock('../../../app/schemas/mine-type', () => {})

jest.mock('../../../app/routes/claim/models/mine-type', () => {
  return jest.fn().mockImplementation(() => {})
})

describe('/claim/mine-type', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should return success', async () => {
    const mockRequest = {}
    const mockH = {
      view: jest.fn()
    }

    await mineType[0].options.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalled()
  })

  test('should return success on POST', async () => {
    const mockRequest = {
      payload: {
        mineType: 'type'
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
    await mineType[1].options.handler(mockRequest, mockH)

    expect(mockH.redirect).toHaveBeenCalled()
  })

  test('on validation fail', async () => {
    const mockRequest = {
      payload: {
        mineType: 'type'
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

    await mineType[1].options.validate.failAction(mockRequest, mockH, {
      error: 'error'
    })

    expect(mockH.view).toHaveBeenCalled()
  })
})
