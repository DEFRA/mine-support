const idService = require('../../../app/services/id-service')

describe('idService', () => {
  test('generateId', () => {
    const id = idService.generateId()
    expect(id).toBeDefined()
    expect(id.length).toBeGreaterThan(0)
  })
})
