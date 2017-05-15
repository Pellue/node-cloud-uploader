
import Hoek from 'hoek';
import Joi from 'joi';

import Storage from '@google-cloud/storage';
import config from '../../../config';

import path from 'path';
// const pubsubConfig = config.get('GCP_PUBSUB');

// const projectId = config.get('GCP_STORAGE').projectId || config.get('GCLOUD_PROJECT');
// const settings = {
// 	projectId,
// 	keyFilename: path.join(__dirname, '../../../auth/', config.get('GCP_STORAGE').keyFilename)
// }


const internals = {};
internals.glcoudSchema = Joi.object().keys({
	settings: Joi.object().keys({
		projectId: Joi.string().required(),
		keyFilename: Joi.string().required()
	}),
	bucket: Joi.string().required()
})

internals.defaults = {
	provider: 'gcloud',
}

class DataStore {
	constructor(options = {}) {
		const defaults =  Hoek.applyToDefaults(internals.defaults, options);
		this._provider = defaults.provider;

		// multiple dataStore
		if (provider === 'gcloud') {

			const validateOptions = internals.glcoudSchema.validate(defaults);
			if (validateOptions.error) {
				throw new TypeError(validateOptions.error);
			}

			this.storage = Storage(defaults.settings);
			this.bucket = this.storage.bucket(defaults.bucket);
		} else {
			this.storage = Storage(settings);
			this.bucket = this.storage.bucket(config.get('GCP_STORAGE_BUCKET'));
		}

	};

	getBucket() {
		return this.bucket;
	}

	get provider() {
		return this._provider;
	}

	set provider(provider) {
		this._provider = provider;
	}

	static getDataStore() {
		return new DataStore();
	};

}

export default DataStore;