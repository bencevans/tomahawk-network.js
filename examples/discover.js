'use strict';

var uuid = require('uuid');

var discover = require('../lib/discover')({
  // If a nodeId and port are provided, the discover library will automatically announce aswell as discover
  nodeId: uuid.v4(), // (optional) An ID used to represent your Tomahawk Network Instance
  port: 50210        // (optional) The TCP server port to be advertised
} /* (optional) deviceCallback */);

discover.on('device', function(device) {
  console.log('Device Found:', device);
});