const ViewModel = require('../../app/routes/claim/models/accessible')

describe('accessible model', () => {
  test('Should include error if error', async () => {
    const model = new ViewModel(true, 'an error')
    expect(model.model.errorMessage.text).toBe('Please select if the property is accessible')
  })

  test('Should not include error if no error', async () => {
    const model = new ViewModel(true)
    expect(model.model.errorMessage).toBeUndefined()
  })

  test('Should include accessible if supplied', async () => {
    const model = new ViewModel(true)
    const actualResult = model.model.items.find(x => x.value === true)
    expect(actualResult.checked).toBe(true)
  })
})
