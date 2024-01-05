const hoek = require('@hapi/hoek')
const sessionHandler = require('../../../app/services/session-handler')

jest.mock('@hapi/hoek', () => ({
  merge: jest.fn()
}))

describe('Session Handler', () => {
  let mockRequest

  beforeEach(() => {
    mockRequest = {
      yar: {
        get: jest.fn(),
        set: jest.fn(),
        clear: jest.fn()
      }
    }
  })

  it('should get session data', () => {
    sessionHandler.get(mockRequest, 'key')
    expect(mockRequest.yar.get).toHaveBeenCalledWith('key')
  })

  it('should set session data', () => {
    sessionHandler.set(mockRequest, 'key', 'value')
    expect(mockRequest.yar.set).toHaveBeenCalledWith('key', 'value')
  })

  it('should update session data', () => {
    const existingData = { existing: 'data' }
    const newData = { new: 'data' }
    mockRequest.yar.get.mockReturnValue(existingData)
    sessionHandler.update(mockRequest, 'key', newData)
    expect(hoek.merge).toHaveBeenCalledWith(existingData, newData, { mergeArrays: false })
    expect(mockRequest.yar.set).toHaveBeenCalledWith('key', existingData)
  })

  it('should clear session data', () => {
    sessionHandler.clear(mockRequest, 'key')
    expect(mockRequest.yar.clear).toHaveBeenCalledWith('key')
  })
})
