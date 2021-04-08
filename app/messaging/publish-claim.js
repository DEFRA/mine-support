const mqConfig = require('../config').claimQueueConfig
const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')
const sessionHandler = require('../services/session-handler')
const sendProtectiveMonitoringEvent = require('../services/protective-monitoring-service')

let claimSender

async function stop () {
  await claimSender.closeConnection()
}

process.on('SIGTERM', async () => {
  await stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await stop()
  process.exit(0)
})

async function publishClaim (request) {
  console.log('REQUEST', request)
  claimSender = new MessageSender(mqConfig)
  const claim = sessionHandler.get(request, 'claim')
  const message = createMessage(claim)
  await claimSender.sendMessage(message)
  await sendProtectiveMonitoringEvent(request, claim, 'Sending claim message')
  await claimSender.closeConnection()
}

module.exports = publishClaim
