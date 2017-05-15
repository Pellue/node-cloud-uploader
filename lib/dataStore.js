import Storage from '@google-cloud/storage';
import config from '../../../config';

import path from 'path';
// const pubsubConfig = config.get('GCP_PUBSUB');

const projectId = config.get('GCP_STORAGE').projectId || config.get('GCLOUD_PROJECT');
const settings = {
	projectId,
	keyFilename: path.join(__dirname, '../../../auth/', config.get('GCP_STORAGE').keyFilename)
}

const defaultOptions = {
	provider: 'gcloud'
}

class DataStore {
	constructor(options = {}) {
		options = { ...defaultOptions, ...options}

		this._provider = options.provider;

		// multiple dataStore
		if (provider === 'gcloud') {
			this.storage = Storage(settings);
			this.bucket = this.storage.bucket(config.get('GCP_STORAGE_BUCKET'));
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