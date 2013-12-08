
var frame = require('./frame');

module.exports.initiateConnection = function() {
  return frame.pack({}, {
   "conntype": "accept-offer",
   "nodeid": "66bd135d-113f-481a-977e-111111111111", 
   "key": 'whitelist', 
   "port": 50210
  });
}