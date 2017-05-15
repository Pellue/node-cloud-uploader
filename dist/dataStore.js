'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _hoek = require('hoek');

var _hoek2 = _interopRequireDefault(_hoek);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _storage = require('@google-cloud/storage');

var _storage2 = _interopRequireDefault(_storage);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const pubsubConfig = config.get('GCP_PUBSUB');

// const projectId = config.get('GCP_STORAGE').projectId || config.get('GCLOUD_PROJECT');
// const settings = {
// 	projectId,
// 	keyFilename: path.join(__dirname, '../../../auth/', config.get('GCP_STORAGE').keyFilename)
// }


var internals = {};
internals.glcoudSchema = _joi2.default.object().keys({
	settings: _joi2.default.object().keys({
		projectId: _joi2.default.string().required(),
		keyFilename: _joi2.default.string().required()
	}),
	bucket: _joi2.default.string().required()
});

internals.defaults = {
	provider: 'gcloud'
};

var DataStore = function () {
	function DataStore() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		(0, _classCallCheck3.default)(this, DataStore);

		var defaults = _hoek2.default.applyToDefaults(internals.defaults, options);
		this._provider = defaults.provider;

		// multiple dataStore
		if (provider === 'gcloud') {

			var validateOptions = internals.glcoudSchema.validate(defaults);
			if (validateOptions.error) {
				throw new TypeError(validateOptions.error);
			}

			this.storage = (0, _storage2.default)(defaults.settings);
			this.bucket = this.storage.bucket(defaults.bucket);
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