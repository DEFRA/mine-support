jest.mock('../../../app/config', () => {
  return {
    cookieOptions: {}
  }
})
const config = require('../../../app/config').cookieOptions

const { plugin } = require('../../../app/plugins/cookies')
const { getCurrentPolicy } = require('../../../app/cookies')

jest.mock('../../../app/cookies', () => ({
  getCurrentPolicy: jest.fn()
}))

describe('Cookies Plugin', () => {
  let mockServer
  let mockRequest
  let mockResponseToolkit

  beforeEach(() => {
    mockServer = {
      state: jest.fn(),
      ext: jest.fn()
    }

    mockRequest = {
      response: {
        variety: 'view',
        statusCode: 200,
        source: {
          manager: {
            _context: {}
          }
        }
      }
    }

    mockResponseToolkit = {
      continue: Symbol('continue')
    }
  })

  it('should register the cookies plugin correctly', () => {
    plugin.register(mockServer)
    expect(mockServer.state).toHaveBeenCalledWith('cookies_policy', config)
  })

  it('should set cookiesPolicy in the context if conditions are met', () => {
    plugin.register(mockServer)
    const onPreResponse = mockServer.ext.mock.calls[0][1]
    const result = onPreResponse(mockRequest, mockResponseToolkit)
    expect(getCurrentPolicy).toHaveBeenCalledWith(
      mockRequest,
      mockResponseToolkit
    )
    expect(result).toBe(mockResponseToolkit.continue)
  })
})
