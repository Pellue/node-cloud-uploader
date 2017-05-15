'use strict';


import DataStore from '../dataStore';

test('create dataStore with settings', ()=>{

	const config = {

		gcloud: {
			settings: {
				projectId: 'test-project',
				keyFilename: 'test-project.json'
			},
			bucket: 'test-project-bucket'
		}
	}

	const store = new DataStore(config);
	expect(store)
})

