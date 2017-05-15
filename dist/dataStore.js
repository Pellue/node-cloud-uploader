'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _storage = require('@google-cloud/storage');

var _storage2 = _interopRequireDefault(_storage);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const pubsubConfig = config.get('GCP_PUBSUB');

var projectId = _config2.default.get('GCP_STORAGE').projectId || _config2.default.get('GCLOUD_PROJECT');
var settings = {
	projectId: projectId,
	keyFilename: _path2.default.join(__dirname, '../../../auth/', _config2.default.get('GCP_STORAGE').keyFilename)
};

var defaultOptions = {
	provider: 'gcloud'
};

var DataStore = function () {
	function DataStore() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		(0, _classCallCheck3.default)(this, DataStore);

		options = (0, _extends3.default)({}, defaultOptions, options);

		this._provider = options.provider;

		// multiple dataStore
		if (provider === 'gcloud') {
			this.storage = (0, _storage2.default)(settings);
			this.bucket = this.storage.bucket(_config2.default.get('GCP_STORAGE_BUCKET'));
		} else {
			this.storage = (0, _storage2.default)(settings);
			this.bucket = this.storage.bucket(_config2.default.get('GCP_STORAGE_BUCKET'));
		}
	}

	(0, _createClass3.default)(DataStore, [{
		key: 'getBucket',
		value: function getBucket() {
			return this.bucket;
		}
	}, {
		key: 'provider',
		get: function get() {
			return this._provider;
		},
		set: function set(provider) {
			this._provider = provider;
		}
	}], [{
		key: 'getDataStore',
		value: function getDataStore() {
			return new DataStore();
		}
	}]);
	return DataStore;
}();

exports.default = DataStore;