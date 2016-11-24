import ngFileUpload from 'ng-file-upload';
import {MediaUploadComponent} from './media-upload.component';
import {MediaUploadService} from './media-upload.service';
import ngWistia from './../ng-wistia';

export default angular.module('media-upload', [ngFileUpload, ngWistia])
  .service('MediaUploadService', MediaUploadService)
  .component(MediaUploadComponent.NAME, MediaUploadComponent.OPTIONS)
  .name;