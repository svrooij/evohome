const EvohomeClient = require('../lib/evohome-client').EvohomeClient

const username = 'youremail'
const password = 'yourpassword'

const evohomeClient = new EvohomeClient(username, password)

evohomeClient.getLocationsWithAutoLogin(3600).then(locations => {
  console.log('Location information %j', locations)
}).catch(err => {
  console.log('Error occured %j', err)
  process.exit(3)
})
