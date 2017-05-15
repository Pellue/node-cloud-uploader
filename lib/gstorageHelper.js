import Gstorage from './gstorage';
import fs from 'fs';
import Util from 'util';


const upload = (file) => {
  return new Promise((resolve, reject) =>{
    const storage = Gstorage.getStorage();
    const bucket = storage.getBucket();
    // const blob = bucket.file(file.hapi.filename);
    // const blobStream = blob.createWriteStream();
    //
    // file.pipe(blobStream);
    // blobStream.on('error', (err) => reject(err));
    // blobStream.on('finish', () => {
    //   const publicUrl = Util.format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
    //   resolve(publicUrl);
    // });

    const localReadStream = fs.createReadStream(file);
    const blobStream = bucket.file(file).createWriteStream();
    localReadStream.pipe(blobStream);

    blobStream.on('error', (err) => reject(err));
    blobStream.on('finish', () => {
      const publicUrl = Util.format(`https://storage.googleapis.com/${bucket.name}/${file}`);
      resolve(publicUrl);
    });

  });
};

export { upload }