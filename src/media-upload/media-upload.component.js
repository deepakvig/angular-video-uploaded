require('./media-upload.scss');
const template = require('./template.html');

export class MediaUploadComponent {
  static NAME = 'mediaUpload';

  static OPTIONS = {
    controller: MediaUploadComponent,
    template: template,
    bindings: {
      onUpload: '&',
      apiKey: '<'
    }
  }

  static $inject = ['$timeout', 'MediaUploadService'];

  constructor($timeout, MediaUploadService){
    this.STATES = { IDLE: 'IDLE', UPLOADING: 'UPLOADING', ERROR: 'ERROR', COMPLETED: 'COMPLETED'};
    this.progress = 0;
    this.file = 0;

    this.service = MediaUploadService;
    this.$timeout = $timeout;
  }

  $onInit(){
    this.state = this.STATES.IDLE;
  }

  $onDestroy(){
    this.state = this.STATES.IDLE;
  }

  submit(){
    const vm = this;
    this.setUploading();

    this.service.upload(vm.file, vm.apiKey)
      .then(function(r){
        vm.setUploaded(r.data);
      }, function(err){
        vm.setFailed(err);
      }, function(r){
        let percent = Math.floor(r.loaded/r.total);
        vm.setProgress(percent)
      });
  }

  setProgress(progress) {
    this.progress = `${progress}%`;
  }

  setUploading(){
    this.setProgress(0);
    this.state = this.STATES.UPLOADING;
  }

  setUploaded(data){
    const thumbURL = data.thumbnail.url;
    const fileName = data.name;
    const videoId       = data.hashed_id;

    this.setProgress(100);
    this.thumb   = thumbURL;
    this.videoId = videoId;

    if(this.onUpload) {
      this.onUpload({files: [{fileName, thumbURL}]});
    }

    this.state   = this.STATES.COMPLETED;
  }

  setFailed(error){
    this.error = error.data.error;
    this.state = this.STATES.ERROR; 
  }
}
