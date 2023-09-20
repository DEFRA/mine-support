const ViewModel = require('../../app/routes/claim/models/date-of-subsidence')

describe('dateOfSubsidence model', () => {
  test('Should include error if error', async () => {
    const model = new ViewModel(Date.UTC, 'an error')
    expect(model.model.errorMessage.text).toBe('Please select a valid date')
  })

  test('Should not include error if no error', async () => {
    const model = new ViewModel(new Date(2022,1,1))
    expect(model.model.errorMessage).toBeUndefined()
  })

  test('Should include date of subsidence if supplied', async () => {
    const model = new ViewModel(new Date(2022,1,1))
    expect(model.model.items.find(x=>x.name==='day').value).toBe(1)
    expect(model.model.items.find(x=>x.name==='month').value).toBe(2)
    expect(model.model.items.find(x=>x.name==='year').value).toBe(2022)
  })
})
