# tomahawk-network.js

[![Build Status](https://travis-ci.org/bencevans/tomahawk-network.js.png?branch=master)](https://travis-ci.org/bencevans/tomahawk-network.js)
[![Coverage Status](https://coveralls.io/repos/bencevans/tomahawk-network.js/badge.png?branch=master)](https://coveralls.io/r/bencevans/tomahawk-network.js?branch=master)
[![Dependency Status](https://david-dm.org/bencevans/tomahawk-network.js.png)](https://david-dm.org/bencevans/tomahawk-network.js)


An implementation of [Tomahawk's](http://tomahawk-player.org) communication protocol in JavaScript intended for Node.js, hopefully also supporting Google Chrome making use of it's chrome.socket API.

## API

This library is split up into many sub-modules.

* Frame - Handles (un)packing net frames & (de/en)coding flags.
* Discover - Handles discovery and announcements on the LAN using dgram broadcasts.
* Connection - Handles the basics in a connection to another Tomahawk network interface.

## Examples

Examples can be found in the [/examples](https://github.com/bencevans/node-sonos/tree/master/examples) directory within the repository.

## Licence

MIT
