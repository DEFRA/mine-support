const schema = require('../../app/schemas/email')

describe('email schema', () => {
  test('Should pass validation for valid email', async () => {
    const result = schema.validate({ email: 'admin@email.com' })

    if (result.error) {
      throw new Error(`The server config is invalid. ${result.error.message}`)
    }
  })

  test('Should fail validation for empty email', async () => {
    const result = schema.validate({ email: '' })
    expect(result.error).toBeDefined()
  })

  test('Should fail validation for invalid property', async () => {
    const result = schema.validate({ name: 'John' })
    expect(result.error).toBeDefined()
  })
})
