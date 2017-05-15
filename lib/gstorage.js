import Storage from '@google-cloud/storage';
import config from '../../../config';

class Gstorage {
  constructor(){
    this.storage = Storage(config.get('GCP_STORAGE'));
    this.bucket = this.storage.bucket(config.get('GCP_STORAGE_BUCKET'));
  };

  getBucket() {
    return this.bucket;
  }

  static getStorage(){
    return new Gstorage();
  };

};

export default Gstorage;