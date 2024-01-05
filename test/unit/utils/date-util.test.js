const { buildDate } = require('../../../app/util/date-util')

const moment = require('moment')

jest.mock('moment', () => jest.fn())

describe('Build Date', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should build date successfully without validation', () => {
    const date = buildDate(2023, 1, 1, false)
    expect(date).toEqual(new Date(2023, 0, 1))
  })

  it('should build date successfully with validation', () => {
    moment.mockReturnValue({
      isValid: () => true
    })
    const date = buildDate(2023, 1, 1, true)
    expect(date).toEqual(new Date(2023, 0, 1))
  })

  it('should throw error for invalid date', () => {
    moment.mockReturnValue({
      isValid: () => false
    })
    expect(() => buildDate(2023, 13, 32, true)).toThrow('Invalid date')
  })

  it('should throw error for future date', () => {
    const futureYear = new Date().getFullYear() + 1
    moment.mockReturnValue({
      isValid: () => true
    })
    expect(() => buildDate(futureYear, 1, 1, true)).toThrow('Future date')
  })
})
