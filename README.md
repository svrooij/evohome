# Evohome client

[![Support me on Github][badge_sponsor]][link_sponsor]

This package will let you control your Honeywell Evohome system from node.

## Usage

Using this library is really easy. Just add it to your package `npn install evohome --save` and start using it.

## Examples

```js
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
```

[badge_sponsor]: https://img.shields.io/badge/Sponsor-on%20Github-red
[link_sponsor]: https://github.com/sponsors/svrooij
