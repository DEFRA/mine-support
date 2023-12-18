const dateOfSubsidence = require('../../../app/routes/claim/date-of-subsidence')

jest.mock('../../../app/services/session-handler', () => {
  return {
    get: jest.fn().mockReturnValue({ accessible: true }),
    update: jest.fn()
  }
})

const dateUtil = require('../../../app/util/date-util')
jest.mock('../../../app/util/date-util', () => {
  return {
    buildDate: jest.fn()
  }
})

jest.mock('../../../app/schemas/date-of-subsidence', () => {})

jest.mock('../../../app/routes/claim/models/date-of-subsidence', () => {
  return jest.fn().mockImplementation(() => {})
})

describe('/claim/date-of-subsidence', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should return success', async () => {
    const mockRequest = {}
    const mockH = {
      view: jest.fn()
    }

    await dateOfSubsidence[0].options.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalled()
  })

  test('should return success on POST', async () => {
    const mockRequest = {
      payload: {
        day: 1,
        month: 1,
        year: 1
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
    dateUtil.buildDate.mockImplementationOnce(() => {})
    await dateOfSubsidence[1].options.handler(mockRequest, mockH)

    expect(mockH.redirect).toHaveBeenCalled()
  })

  test('date util error', async () => {
    const mockRequest = {}
    const mockH = {
      view: jest.fn(() => {
        return {
          takeover: jest.fn()
        }
      }),
      redirect: jest.fn()
    }
    dateUtil.buildDate.mockImplementationOnce(() => new Error('error'))
    await dateOfSubsidence[1].options.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalled()
  })

  test('on validation fail', async () => {
    const mockRequest = {
      payload: {
        day: 1,
        month: 1,
        year: 1
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

    await dateOfSubsidence[1].options.validate.failAction(mockRequest, mockH, {
      error: 'error'
    })

    expect(mockH.view).toHaveBeenCalled()
  })
})
