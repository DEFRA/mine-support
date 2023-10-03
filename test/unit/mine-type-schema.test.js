const schema = require('../../app/schemas/mine-type')

describe('mine-type schema', () => {
  test('Should pass validation for valid mine type', async () => {
    const result = schema.validate({ mineType: ['coal'] })

    if (result.error) {
      throw new Error(`The server config is invalid. ${result.error.message}`)
    }
  })

  test('Should fail validation for empty minetype', async () => {
    const result = schema.validate({ mineType: [''] })
    expect(result.error).toBeDefined()
  })

  test('Should fail validation for invalid property', async () => {
    const result = schema.validate({ mineType: ['unknown'] })
    expect(result.error).toBeDefined()
  })
})
