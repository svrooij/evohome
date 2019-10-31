# Evohome client

[![Support me on Github][badge_sponsor]][link_sponsor]

This package will let you control your Honeywell Evohome system from node.

## Usage

Using this library is really easy. Just add it to your package `npn install @svrooij/evohome --save` and start using it.

## Examples

```js
const EvohomeClient = require('../lib/evohome-client').EvohomeClient
const username = 'youremail'
const password = 'yourpassword'
const evohomeClient = new EvohomeClient(username, password)

evohomeClient.getLocationsWithAutoLogin(3600).then(locations => {
  console.log('Location information %s', JSON.stringify(locations, null, 2))
}).catch(err => {
  console.log('Error occured %j', err)
  process.exit(3)
})
```

## Developer section

This library is build in typescript, but released as javascript. To start developing:

1. Check-out the code.
2. run `npm install` to install the typescript compiled and the dependencies.
3. Make your changes in the `./lib` folder.
4. Run `npm run build` to compile the code to javascript.
5. The code is linted with **eslint**, run the linter with `npm run lint` or `npm run lint-fix` to auto-fix.
6. Run the test to make sure it still works. `npm t`.

If you have set the environment variables `EVOHOME_USERNAME` and `EVOHOME_PASSWORD` the tests will try to load your actual data.
In VSCode you can set environment variables by adding this to the `settings.json` file.

```json
{
    "editor.tabSize": 2,
    "terminal.integrated.env.osx": {
      "EVOHOME_USERNAME":"your_username",
      "EVOHOME_PASSWORD":"your_password"
    }
}
```

[badge_sponsor]: https://img.shields.io/badge/Sponsor-on%20Github-red
[link_sponsor]: https://github.com/sponsors/svrooij
