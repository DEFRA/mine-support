// test.js
const assert = require('assert')

describe('Environment Variable Test', function () {
  it('should print the environment variable', function () {
    const envVar = process.env.ffc-demo-web-TEST-VAR
    console.log('Environment Variable:', envVar)
    assert.ok(envVar, 'Environment variable is not set')
  })
})
