
const UPLOAD_URL = "https://upload.wistia.com/";

export class MediaUploadService {
  static $inject = ['$q', 'Upload'];

  constructor($q, Upload){
    this.$q = $q;
    this.Upload = Upload;
  }

  upload(file, api_key){
    var deferred = this.$q.defer();

    this.Upload.upload(this.buildParams(file, api_key))
              .then(function(e){
                deferred.resolve(e);
              }, function(e) {
                deferred.reject(e);
              }, function(r) {
                deferred.notify(r);
              });

    return deferred.promise;
  }

  buildParams(file, api_key){
    const data = {
      "Content-Type": 'application/x-www-form-urlencoded',
      "api_password": api_key,
      file
    }

    return {
      url: UPLOAD_URL,
      data
    }
  }
}