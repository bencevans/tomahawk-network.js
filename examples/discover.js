'use strict';

var uuid = require('uuid');

var discover = new (require('../lib/discover')).Discover({
  nodeId: uuid.v4(), // An ID used to represent your Tomahawk Network Instance
  port: 50210        // The TCP server port
});

discover.on('device', function(device) {
  console.log('Device Found:', device);
});