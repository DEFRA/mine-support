const { MessageProviderPact } = require('@pact-foundation/pact')
const createMessage = require('../../app/messaging/create-message')

describe('Pact Verification', () => {
  test('validates the expectations of ffc-demo-claim-service', async () => {
    const claim = {
      claimId: 'MINE123',
      name: 'Joe Bloggs',
      propertyType: 'business',
      accessible: false,
      dateOfSubsidence: '2015-08-06T16:53:10.123+01:00',
      mineType: ['gold'],
      email: 'hello@pact.io'
    }

    const provider = new MessageProviderPact({
      messageProviders: {
        'a request for new claim': () => createMessage(claim).body
      },
      provider: 'ffc-demo-web',
      consumerVersionTags: ['main', 'dev', 'test', 'preprod', 'prod'],
      pactBrokerUrl: process.env.PACT_BROKER_URL,
      pactBrokerUsername: process.env.PACT_BROKER_USERNAME,
      pactBrokerPassword: process.env.PACT_BROKER_PASSWORD
    })

    return provider.verify()
  })
})
