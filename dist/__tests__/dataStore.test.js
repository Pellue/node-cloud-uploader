'use strict';

var _dataStore = require('../dataStore');

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('create dataStore with settings', function () {

	var config = {

		gcloud: {
			settings: {
				projectId: 'test-project',
				keyFilename: 'test-project.json'
			},
			bucket: 'test-project-bucket'
		}
	};

	var store = new _dataStore2.default(config);
	expect(store);
});