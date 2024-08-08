const appInsights = require('applicationinsights')

function setup () {
  if (process.env.APPINSIGHTS_CONNECTIONSTRING) {
    appInsights.setup(process.env.APPINSIGHTS_CONNECTIONSTRING).start()
    console.log('App Insights Running')
    const cloudRoleTag = appInsights.defaultClient.context.keys.cloudRole
    const appName = process.env.APPINSIGHTS_CLOUDROLE
    appInsights.defaultClient.context.tags[cloudRoleTag] = appName
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

function trackTrace (message) {
  appInsights.defaultClient.trackTrace({ message })
}

function trackMetric (name, value) {
  appInsights.defaultClient.trackMetric({ name, value })
}

function trackDependency (dependency) {
  appInsights.defaultClient.trackDependency(dependency)
}

function flush () {
  appInsights.defaultClient.flush()
}

module.exports = { setup }
