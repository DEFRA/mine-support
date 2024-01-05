const ViewModel = require('../../app/routes/cookies/models/cookies-policy')

describe('cookies policy model', () => {
  test('Should populate model with policy', async () => {
    const model = new ViewModel()
    expect(model.analytics).toBeDefined()
    expect(model.updated).toBeDefined()
  })
})
