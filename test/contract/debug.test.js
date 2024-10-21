// test.js
const assert = require('assert')

describe('Environment Variable Test', function () {
  it('should print the environment variable', function () {
    const envVar = process.env.MY_ENV_VAR
    console.log('Environment Variable:', envVar)
    assert.ok(envVar, 'Environment variable is not set')
  })
})
