const ViewModel = require('../../app/routes/claim/models/mine-type')

describe('email model', () => {
  test('Should include error if error', async () => {
    const model = new ViewModel(['coal'], 'an error')
    expect(model.model.errorMessage.text).toBe('Please select mine types')
  })

  test('Should not include error if no error', async () => {
    const model = new ViewModel(['coal'])
    expect(model.model.errorMessage).toBeUndefined()
  })

  test('Should include minetype if minetype supplied', async () => {
    const model = new ViewModel(['coal'])
    const actualResult = model.model.items.find(x=>x.value==='coal')
    expect(actualResult.checked).toBe(true)
  })
})
