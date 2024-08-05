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

    const url = process.env.PACT_BROKER_URL;
    const username = process.env.PACT_BROKER_USERNAME;
    const password = process.env.PACT_BROKER_PASSWORD;

    expect(url).toBeDefined();
    expect(username).toBeDefined();
    expect(password).toBeDefined();

    const provider = new MessageProviderPact({
      messageProviders: {
        'a request for new claim': () => createMessage(claim).body
      },
      provider: 'ffc-demo-web',
      consumerVersionTags: ['main', 'dev', 'test', 'preprod', 'prod'],
      pactBrokerUrl: url,
      pactBrokerUsername: username,
      pactBrokerPassword: password
    })

    return provider.verify()
  })
})
