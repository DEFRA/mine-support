const appInsights = require('applicationinsights')

function setup () {
  if (process.env.APPINSIGHTS_CONNECTIONSTRING) {
    appInsights.setup(process.env.APPINSIGHTS_CONNECTIONSTRING).start()
    console.log('App Insights Running')
    const cloudRoleTag = appInsights.defaultClient.context.keys.cloudRole
    const appName = process.env.APPINSIGHTS_CLOUDROLE
    appInsights.defaultClient.context.tags[cloudRoleTag] = appName
    trackEvent('AppInsights', { status: 'Running' })
    trackException(new Error('AppInsights Running'))
    trackRequest({ name: 'AppInsights', duration: 100, resultCode: 200, success: true })
  } else {
    console.log('App Insights Not Running!')
  }
}

function trackEvent (name, properties) {
  appInsights.defaultClient.trackEvent({ name, properties })
}

function trackException (error) {
  appInsights.defaultClient.trackException({ error })
}

function trackRequest (request) {
  appInsights.defaultClient.trackRequest(request)
}

module.exports = { setup }
