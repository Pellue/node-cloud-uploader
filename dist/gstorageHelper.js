'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _gstorage = require('./gstorage');

var _gstorage2 = _interopRequireDefault(_gstorage);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upload = function upload(file) {
  return new _promise2.default(function (resolve, reject) {
    var storage = _gstorage2.default.getStorage();
    var bucket = storage.getBucket();
    // const blob = bucket.file(file.hapi.filename);
    // const blobStream = blob.createWriteStream();
    //
    // file.pipe(blobStream);
    // blobStream.on('error', (err) => reject(err));
    // blobStream.on('finish', () => {
    //   const publicUrl = Util.format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
    //   resolve(publicUrl);
    // });

    var localReadStream = _fs2.default.createReadStream(file);
    var blobStream = bucket.file(file).createWriteStream();
    localReadStream.pipe(blobStream);

    blobStream.on('error', function (err) {
      return reject(err);
    });
    blobStream.on('finish', function () {
      var publicUrl = _util2.default.format('https://storage.googleapis.com/' + bucket.name + '/' + file);
      resolve(publicUrl);
    });
  });
};

exports.upload = upload;