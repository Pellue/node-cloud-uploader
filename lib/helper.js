import DataStore from './dataStore';
import util from 'util';


const uploadToStore = (file, options = {}) => {
	const dataStore = DataStore.getDataStore();
	const bucket = dataStore.getBucket();

	const filename = file.hapi.filename;
	// const extension = filename.match(/\.(mp3|flac|wav|m4r|m4a)$/)[0];
	const extension = filename.match(/\.(mp3|flac|wav|m4r|m4a)$/)[0];


	const prefix = options['prefix'] !== undefined ? options['prefix'] : ''
	const path = `${prefix}/original${extension}`

	const blob = bucket.file(path);
	const blobStream = blob.createWriteStream();

	return new Promise((resolve, reject) => {
		file.pipe(blobStream);
		blobStream.on('error', (err) => reject(err));
		blobStream.on('finish', () => {
			blob.makePublic().then(() => {
				const url = util.format(`https://storage.googleapis.com/${bucket.name}/${prefix}/original${extension}`);
				resolve(url)
			}).catch((err)=> {
				reject(err)
			});
		});
	});
};

export {uploadToStore};