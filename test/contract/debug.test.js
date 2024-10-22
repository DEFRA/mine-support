// test.js
const assert = require('assert')

describe('Environment Variable Test', function () {
  it('should print the environment variable', function () {
    const envVar = process.env.ffc_demo_web_TEST_VAR
    console.log('Environment Variable:', envVar)
    assert.ok(envVar, 'Environment variable is not set')
  })
})
