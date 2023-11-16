const { DaprClient } = require("@dapr/dapr");
const sessionHandler = require("../services/session-handler");
const sendProtectiveMonitoringEvent = require("../services/protective-monitoring-service");

const daprHost = process.env.DAPR_HOST || "http://localhost";
const daprPort = process.env.DAPR_HTTP_PORT || "3500";
const pubSubName = "claim-pubsub";
const pubSubTopic = "claim";

let daprClient;

async function startDaprClient() {
  daprClient = new DaprClient({ daprHost, daprPort });
}

async function publishClaim(request) {
  try {
    if (!daprClient) {
      await startDaprClient();
    }

    const claim = sessionHandler.get(request, "claim");
    console.log(`Publishing claim ${claim.claimId} to Dapr pub/sub`);

    await daprClient.pubsub.publish(pubSubName, pubSubTopic, claim);

    await sendProtectiveMonitoringEvent(request, claim, "Claim submitted");

    console.log("Claim published successfully to Dapr pub/sub");
  } catch (error) {
    console.error("Error during claim publication:", error);
  }
}

module.exports = publishClaim;
