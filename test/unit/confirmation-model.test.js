const ViewModel = require('../../app/routes/claim/models/confirmation')

describe('confirmation model', () => {
  test('Should populate model with claim', async () => {
    const claim = {
      claimId: 'claim123'
    }
    const model = new ViewModel(claim)
    expect(model.model).toBeDefined()
    expect(model.model.titleText).toBeDefined()
    expect(model.model.html).toBeDefined()
  })
})
