const mockSendEvent = jest.fn()
jest.mock('ffc-protective-monitoring', () => {
  return {
    PublishEvent: jest.fn().mockImplementation(() => {
      return { sendEvent: mockSendEvent }
    })
  }
})

const mockSendMessage = jest.fn()
jest.mock('ffc-messaging', () => {
  return {
    MessageSender: jest.fn().mockImplementation(() => {
      return { sendMessage: mockSendMessage }
    })
  }
})

const publishClaim = require('../../app/messaging/publish-claim')
let request

describe('publish claim', () => {
  const claim = {
    claimId: 'MINE1',
    propertyType: 'business',
    accessible: false,
    dateOfSubsidence: '2019-07-26T09:54:19.622Z',
    mineType: ['gold', 'silver'],
    email: 'joe.bloggs@defra.gov.uk'
  }

  beforeEach(() => {
    request = {
      headers: {
        'x-forwarded-for': '127.0.0.1'
      }
    }
  })

  test('should publish claim', async () => {
    await publishClaim(request)
    expect(mockSendEvent).toHaveBeenCalledTimes(1)
    expect(mockSendMessage).toHaveBeenCalledTimes(1)
  })
})
