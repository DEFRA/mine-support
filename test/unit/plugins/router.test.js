const homeRoutes = require('../../../app/routes/home')
const healthyRoutes = require('../../../app/routes/healthy')
const healthzRoutes = require('../../../app/routes/healthz')
const nameRoute = require('../../../app/routes/claim/name')
const propertyTypeRoute = require('../../../app/routes/claim/property-type')
const accessibleRoute = require('../../../app/routes/claim/accessible')
const dateOfSubsRoute = require('../../../app/routes/claim/date-of-subsidence')
const mineTypeRoute = require('../../../app/routes/claim/mine-type')
const emailRoute = require('../../../app/routes/claim/email')
const confirmationRoute = require('../../../app/routes/claim/confirmation')
const sessionRoute = require('../../../app/routes/clear-session')
const cookieRoute = require('../../../app/routes/cookies/cookies')
const staticRoutes = require('../../../app/routes/static')

const router = require('../../../app/plugins/router')

jest.mock('../../../app/routes/home', () => [{ path: '/home' }])
jest.mock('../../../app/routes/healthy', () => [{ path: '/healthy' }])
jest.mock('../../../app/routes/healthz', () => [{ path: '/healthz' }])
jest.mock('../../../app/routes/claim/name', () => [{ path: '/claim/name' }])
jest.mock('../../../app/routes/claim/property-type', () => [
  { path: '/claim/property-type' }
])
jest.mock('../../../app/routes/claim/accessible', () => [
  { path: '/claim/accessible' }
])
jest.mock('../../../app/routes/claim/date-of-subsidence', () => [
  { path: '/claim/date-of-subsidence' }
])
jest.mock('../../../app/routes/claim/mine-type', () => [
  { path: '/claim/mine-type' }
])
jest.mock('../../../app/routes/claim/email', () => [{ path: '/claim/email' }])
jest.mock('../../../app/routes/claim/confirmation', () => [
  { path: '/claim/confirmation' }
])
jest.mock('../../../app/routes/clear-session', () => [
  { path: '/clear-session' }
])
jest.mock('../../../app/routes/cookies/cookies', () => [
  { path: '/cookies/cookies' }
])
jest.mock('../../../app/routes/static', () => [{ path: '/static' }])

describe('router plugin', () => {
  test('should register routes when register is called', () => {
    const mockServer = {
      route: jest.fn()
    }

    router.plugin.register(mockServer)

    expect(mockServer.route).toHaveBeenCalledWith(
      [].concat(
        homeRoutes,
        healthyRoutes,
        healthzRoutes,
        nameRoute,
        propertyTypeRoute,
        accessibleRoute,
        dateOfSubsRoute,
        mineTypeRoute,
        emailRoute,
        confirmationRoute,
        sessionRoute,
        cookieRoute,
        staticRoutes
      )
    )
  })
})
