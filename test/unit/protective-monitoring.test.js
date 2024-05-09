const mockSendEvent = jest.fn()
jest.mock('ffc-protective-monitoring', () => {
  return {
    PublishEvent: jest.fn().mockImplementation(() => {
      return { sendEvent: mockSendEvent }
    })
  }
})

let request

describe('send protective monitoring event', () => {
  const claim = {
    claimId: 'MINE1',
    propertyType: 'business',
    accessible: false,
    dateOfSubsidence: '2019-07-26T09:54:19.622Z',
    mineType: ['gold', 'silver'],
    email: 'joe.bloggs@defra.gov.uk'
  }

  beforeEach(() => {
    process.env.COOKIE_PASSWORD = 'cookie_password_cookie_password'
    process.env.IP_FORWARD_HEADER_NAME = 'x-forwarded-for'
  })

  test('should send protective monitoring payload with x-forwarded-for header', async () => {
    request = {
      headers: {
        'x-forwarded-for': '127.0.0.1'
      }
    }

    const sendProtectiveMonitoringEvent = require('../../app/services/protective-monitoring-service')

    await sendProtectiveMonitoringEvent(request, claim, 'Test message')
    expect(mockSendEvent).toHaveBeenCalledTimes(1)
  })

  test('should send protective monitoring payload with remoteAddress', async () => {
    request = {
      headers: {},
      info: {
        remoteAddress: '127.0.0.1'
      }
    }

    const sendProtectiveMonitoringEvent = require('../../app/services/protective-monitoring-service')

    await sendProtectiveMonitoringEvent(request, claim, 'Test message')
    expect(mockSendEvent).toHaveBeenCalledTimes(2)
  })
})
