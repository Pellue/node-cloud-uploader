'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.uploadToStore = undefined;

var _dataStore = require('./dataStore');

var _dataStore2 = _interopRequireDefault(_dataStore);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadToStore = function uploadToStore(dataStore, file) {
	var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


	var bucket = dataStore.getBucket();
	var filename = file.hapi.filename;
	// const extension = filename.match(/\.(mp3|flac|wav|m4r|m4a)$/)[0];
	var extension = filename.match(/\.(mp3|flac|wav|m4r|m4a)$/)[0];

	var prefix = options['prefix'] !== undefined ? options['prefix'] : '';
	var path = prefix + '/original' + extension;

	var blob = bucket.file(path);
	var blobStream = blob.createWriteStream();

	return new _bluebird2.default(function (resolve, reject) {
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