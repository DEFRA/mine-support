const schema = require('../../app/schemas/accessible')

describe('accessible schema', () => {
  test('Should pass validation for valid accessible', async () => {
    const result = schema.validate({ accessible: true })

    if (result.error) {
      throw new Error(`The server config is invalid. ${result.error.message}`)
    }
  })

  test('Should fail validation for empty accessible value', async () => {
    const result = schema.validate({ })
    expect(result.error).toBeDefined()
  })

  test('Should fail validation for invalid accessible value', async () => {
    const result = schema.validate({ accessible: 'invalid' })
    expect(result.error).toBeDefined()
  })
})
