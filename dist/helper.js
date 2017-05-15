'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.uploadToStore = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _dataStore = require('./dataStore');

var _dataStore2 = _interopRequireDefault(_dataStore);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadToStore = function uploadToStore(file) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var dataStore = _dataStore2.default.getDataStore();
	var bucket = dataStore.getBucket();

	var filename = file.hapi.filename;
	var extension = filename.match(/\.(mp3|flac|wav|m4r|m4a)$/)[0];

	var prefix = options['prefix'] !== undefined ? options['prefix'] : '';
	var path = prefix + '/original' + extension;

	var blob = bucket.file(path);
	var blobStream = blob.createWriteStream();

	return new _promise2.default(function (resolve, reject) {
		file.pipe(blobStream);
		blobStream.on('error', function (err) {
			return reject(err);
		});
		blobStream.on('finish', function () {
			blob.makePublic().then(function () {
				var url = _util2.default.format('https://storage.googleapis.com/' + bucket.name + '/' + prefix + '/original' + extension);
				resolve(url);
			}).catch(function (err) {
				reject(err);
			});
		});
	});
};

exports.uploadToStore = uploadToStore;