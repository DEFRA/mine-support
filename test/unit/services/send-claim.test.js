const { submit } = require('../../../app/services/send-claim')
const sessionHandler = require('../../../app/services/session-handler')

jest.mock('../../../app/services/session-handler', () => ({
  get: jest.fn().mockReturnValue({ claimId: 'mockClaimId' })
}))

jest.mock('../../../app/messaging/publish-claim', () => ({
  publishClaim: jest.fn().mockResolvedValue()
}))
const { publishClaim } = require('../../../app/messaging/publish-claim')

describe('Submit Claim', () => {
  let mockRequest

  beforeEach(() => {
    mockRequest = {}
    jest.clearAllMocks()
  })

  it('should submit claim successfully', async () => {
    await submit(mockRequest)
    expect(sessionHandler.get).toHaveBeenCalledWith(mockRequest, 'claim')
  })

  it('should handle error when submitting claim', async () => {
    publishClaim.mockImplementationOnce(() => {
      throw new Error('mock error')
    })
    await submit(mockRequest)
    expect(sessionHandler.get).toHaveBeenCalledWith(mockRequest, 'claim')
  })
})
