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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import config from '../../../config';

// import path from 'path';
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

internals.defaultSchema = _joi2.default.object().keys({
	provider: _joi2.default.string().required(),
	gcloud: _joi2.default.object().required()
	// gcloud: Joi.alternatives().when('provider', {is: 'gcloud', then: Joi.object().required()})
});

internals.defaults = {
	provider: 'gcloud'
};

var DataStore = function () {
	function DataStore() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		(0, _classCallCheck3.default)(this, DataStore);


		var defaults = _hoek2.default.applyToDefaults(internals.defaults, options);
		var validateDefaults = internals.defaultSchema.validate(defaults);

		if (validateDefaults.error) {
			throw new TypeError(validateDefaults.error);
		}

		this._provider = defaults.provider;

		// multiple dataStore
		if (this.provider === 'gcloud') {

			var validateOptions = internals.glcoudSchema.validate(defaults.gcloud);
			if (validateOptions.error) {
				throw new TypeError(validateOptions.error);
			}

			var gcloud = defaults.gcloud;

			this.storage = (0, _storage2.default)(gcloud.settings);
			this.bucket = this.storage.bucket(gcloud.bucket);
		} else {
			throw new Error('invalid provider');
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
		key: 'getDataStoreWithEnv',
		value: function getDataStoreWithEnv(configStore) {
			return new DataStore();
		}
	}]);
	return DataStore;
}();

exports.default = DataStore;