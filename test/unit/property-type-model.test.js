const ViewModel = require('../../app/routes/claim/models/property-type')

describe('propertyType model', () => {
  test('Should include error if error', async () => {
    const model = new ViewModel('home', 'an error')
    expect(model.model.errorMessage.text).toBe('Please select a property type')
  })

  test('Should not include error if no error', async () => {
    const model = new ViewModel('home')
    expect(model.model.errorMessage).toBeUndefined()
  })

  test('Should include property type if supplied', async () => {
    const model = new ViewModel('home')
    const actualResult = model.model.items.find(x=>x.value==='home')
    expect(actualResult.checked).toBe(true)
  })
})
