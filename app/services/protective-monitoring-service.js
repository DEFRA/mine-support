const { PublishEvent } = require('ffc-protective-monitoring')
const config = require('../config');

async function sendEvent (request, claim, event) {
  const protectiveMonitoring = new PublishEvent(config.protectiveMonitoringUrl)
  await protectiveMonitoring.sendEvent({
    sessionid: claim.claimId,
    datetime: createEventDate(),
    version: '1.1',
    application: 'ffc-demo-web',
    component: 'ffc-demo-web',
    ip: getIpAddress(request),
    pmccode: '001',
    priority: '0',
    details: {
      message: event,
    },
  });
  console.log(`Protective monitoring event sent: ${event}`)
}

function getIpAddress (request) {
  const headerName = process.env.IP_FORWARD_HEADER_NAME

  // Checks if environment variable is defined for header name otherwise return the direct IP address

  if (!headerName) {
    return request.info.remoteAddress
  }

  const xForwardedForHeader = request.headers[headerName]

  return xForwardedForHeader
    ? xForwardedForHeader.split(",")[0]
    : request.info.remoteAddress
}

function createEventDate () {
  const eventDate = new Date()
  return eventDate.toISOString()
}

module.exports = sendEvent
