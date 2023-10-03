const schema = require('../../app/schemas/date-of-subsidence')

describe('email schema', () => {
  test('Should pass validation for valid date of subsidence', async () => {
    const result = schema.validate({ day: 1, month: 1, year: 2022 })

    if (result.error) {
      throw new Error(`The server config is invalid. ${result.error.message}`)
    }
  })

  test('Should fail validation for empty property type', async () => {
    const result = schema.validate({ day: 1 })
    expect(result.error).toBeDefined()
  })

  test('Should fail validation for invalid property', async () => {
    const result = schema.validate({ day: 32, month: 1, year: 2022 })
    expect(result.error).toBeDefined()
  })
})
