const ViewModel = require('../../app/routes/claim/models/email')

describe('email model', () => {
  test('Should include error if error', async () => {
    const model = new ViewModel('admin@email.com', 'an error')
    expect(model.model.errorMessage.text).toBe('Enter email in the correct format')
  })

  test('Should not include error if no error', async () => {
    const model = new ViewModel('admin@email.com')
    expect(model.model.errorMessage).toBeUndefined()
  })

  test('Should include email if email supplied', async () => {
    const model = new ViewModel('admin@email.com')
    expect(model.model.value).toBe('admin@email.com')
  })
})
