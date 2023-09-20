const schema = require('../../app/schemas/property-type')

describe('email schema', () => {
  test('Should pass validation for valid property type', async () => {
    const result = schema.validate({ propertyType: 'home' })

    if (result.error) {
      throw new Error(`The server config is invalid. ${result.error.message}`)
    }
  })

  test('Should fail validation for empty property type', async () => {
    const result = schema.validate({ propertyType: '' })
    expect(result.error).toBeDefined()
  })

  test('Should fail validation for invalid property', async () => {
    const result = schema.validate({ propertyType: 'John' })
    expect(result.error).toBeDefined()
  })
})
