
var buffer = require('bops');

var packFrame = function (flags, body) {

  var bodyBuffer  = body;

  if(bodyBuffer && !Buffer.isBuffer(bodyBuffer)) {
    flags.JSON = true;
    bodyBuffer = new Buffer(JSON.stringify(bodyBuffer));
  }
  var bodyBuffer= bodyBuffer || new Buffer(0);
  var flagsBuffer = encodeFlags(flags);
  var frameBuffer = new Buffer(5 + bodyBuffer.length);
  frameBuffer.writeUInt32BE(bodyBuffer.length, 0);
  frameBuffer.writeUInt8(flagsBuffer, 4);
  bodyBuffer.copy(frameBuffer, 5);

  return frameBuffer;
};

var unpackFrame = function(frameBuffer) {

  if(frameBuffer.length < 5) {
    throw new Error('Invalid frame length');
  }

  var message = {
    payloadLength: frameBuffer.readUInt32BE(0),
    flags: decodeFlags(frameBuffer.slice(4, 5)),
  };
  message.payload = frameBuffer.slice(5, 5 + message.payloadLength);

  if(message.flags.JSON) {
    message.payload = JSON.parse(message.payload.toString('utf8'));
  }

  return message;

}

var decodeFlags = function (flagsBuffer) {

  var flagsInt = flagsBuffer.readUInt8(0);

  return {
    RAW        : flagsInt & 1 ? true   : false,
    JSON       : flagsInt & 2 ? true   : false,
    FRAGMENT   : flagsInt & 4 ? true   : false,
    COMPRESSED : flagsInt & 8 ? true   : false,
    DBOP       : flagsInt & 16 ? true  : false,
    PING       : flagsInt & 32 ? true  : false,
    RESERVED_1 : flagsInt & 64 ? true  : false,
    SETUP      : flagsInt & 128 ? true : false
  }
}

var encodeFlags = function (flagsObj) {

  var flagsInt = 0;

  flagsInt = flagsObj.RAW        ? flagsInt | 1   : flagsInt;
  flagsInt = flagsObj.JSON       ? flagsInt | 2   : flagsInt;
  flagsInt = flagsObj.FRAGMENT   ? flagsInt | 4   : flagsInt;
  flagsInt = flagsObj.COMPRESSED ? flagsInt | 8   : flagsInt;
  flagsInt = flagsObj.DBOP       ? flagsInt | 16  : flagsInt;
  flagsInt = flagsObj.PING       ? flagsInt | 32  : flagsInt;
  flagsInt = flagsObj.RESERVED_1 ? flagsInt | 64  : flagsInt;
  flagsInt = flagsObj.SETUP      ? flagsInt | 128 : flagsInt;

  return flagsInt;
}

module.exports.unpack = unpackFrame;
module.exports.pack = packFrame;
module.exports.decodeFlags = decodeFlags;
module.exports.encodeFlags = encodeFlags;