'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _storage = require('@google-cloud/storage');

var _storage2 = _interopRequireDefault(_storage);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Gstorage = function () {
  function Gstorage() {
    (0, _classCallCheck3.default)(this, Gstorage);

    this.storage = (0, _storage2.default)(_config2.default.get('GCP_STORAGE'));
    this.bucket = this.storage.bucket(_config2.default.get('GCP_STORAGE_BUCKET'));
  }

  (0, _createClass3.default)(Gstorage, [{
    key: 'getBucket',
    value: function getBucket() {
      return this.bucket;
    }
  }], [{
    key: 'getStorage',
    value: function getStorage() {
      return new Gstorage();
    }
  }]);
  return Gstorage;
}();

;

exports.default = Gstorage;