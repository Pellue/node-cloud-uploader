import Hoek from 'hoek';
import Joi from 'joi';

import Storage from '@google-cloud/storage';
// import config from '../../../config';

// import path from 'path';
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

internals.defaultSchema = Joi.object().keys({
	provider: Joi.string().required(),
	gcloud: Joi.object().required()
	// gcloud: Joi.alternatives().when('provider', {is: 'gcloud', then: Joi.object().required()})
})

internals.defaults = {
	provider: 'gcloud'
}

class DataStore {
	constructor(options = {}) {

		const defaults = Hoek.applyToDefaults(internals.defaults, options);
		const validateDefaults = internals.defaultSchema.validate(defaults);

		if (validateDefaults.error) {
			throw new TypeError(validateDefaults.error);
		}

		this._provider = defaults.provider;

		// multiple dataStore
		if (this.provider === 'gcloud') {

			const validateOptions = internals.glcoudSchema.validate(defaults.gcloud);
			if (validateOptions.error) {
				throw new TypeError(validateOptions.error);
			}

			const gcloud = defaults.gcloud;

			this.storage = Storage(gcloud.settings);
			this.bucket = this.storage.bucket(gcloud.bucket);
		} else {
			throw new Error('invalid provider');
		}

	};

	getBucket() {
		return this.bucket;
	}

	getPublicUrl(path) {

		if (this.provider ==='gcloud') {
			return `https://storage.googleapis.com/${path}`;
		}
		else {
			throw new Error('invalid provider')
		}

	}

	get provider() {
		return this._provider;
	}

	set provider(provider) {
		this._provider = provider;
	}

	static getDataStoreWithEnv(configStore) {
		return new DataStore();
	};

}

export default DataStore;