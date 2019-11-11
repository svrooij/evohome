const EvohomeClient = require('../lib/evohome-client').EvohomeClient
const HeatSetpointStatus = require('../lib/evohome-client').HeatSetpointStatus

const username = 'your_user@domain.com'
const password = 'your_password'

const evohomeClient = new EvohomeClient(username, password)

evohomeClient.getLocationsWithAutoLogin(3600).then(locations => {
  console.log('Location information %s', JSON.stringify(locations, null, 2))

  // Choose a device to change, you'll need the deviceID.
  const deviceId = locations[0].devices[0].deviceID

  // Set the temperature of this device Temporary to 18 degrees for 60 minutes.
  // return evohomeClient.setHeatSetpoint(deviceId, HeatSetpointStatus.Temporary, 18, 60)

  // Set the temperature of this device indefinitly to 18 degrees
  // return evohomeClient.setHeatSetpoint(deviceId, HeatSetpointStatus.Hold, 18)

  // Revert the device back to the schedule.
  // return evohomeClient.setHeatSetpoint(deviceId, HeatSetpointStatus.Scheduled)
}).catch(err => {
  console.log('Error occured %j', err)
  process.exit(3)
})

setTimeout(() => {
  console.log('Timeout')
  process.exit(0)
}, 30000)
