const accessible = require('../../../app/routes/claim/accessible')

jest.mock('../../../app/schemas/accessible', () => {
  return {
    accessible: true
  }
})

jest.mock('../../../app/services/session-handler', () => {
  return {
    get: jest.fn().mockReturnValue({ accessible: true }),
    update: jest.fn()
  }
})

jest.mock('../../../app/routes/claim/models/accessible', () => {
  return jest.fn().mockImplementation(() => {})
})

describe('/claim/accessible', () => {
  test('should return success', async () => {
    const mockRequest = {}
    const mockH = {
      view: jest.fn()
    }

    await accessible[0].options.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalled()
  })

  test('should return success on POST', async () => {
    const mockRequest = {}
    const mockH = {
      view: jest.fn(),
      redirect: jest.fn()
    }

    await accessible[1].options.handler(mockRequest, mockH)

    expect(mockH.redirect).toHaveBeenCalled()
  })

  test('on validation fail', async () => {
    const mockRequest = {
      payload: {
        accessible: true
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

    await accessible[1].options.validate.failAction(mockRequest, mockH, {
      error: 'error'
    })

    expect(mockH.view).toHaveBeenCalled()
  })
})
