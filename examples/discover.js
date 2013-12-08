'use strict';

var uuid = require('uuid');

var discover = require('../lib/discover')({
  nodeId: uuid.v4(), // An ID used to represent your Tomahawk Network Instance
  port: 50210        // The TCP server port
} /* (optional) deviceCallback */);

discover.on('device', function(device) {
  console.log('Device Found:', device);
});