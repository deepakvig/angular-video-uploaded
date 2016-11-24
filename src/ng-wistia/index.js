
const ngWistia = angular.module('ngWistia', []);

ngWistia.component('wistiaPlayer', {
  bindings: {
    hashedId: '@',
    width: "@",
    height: "@"
  },
  template: require('./template.html'),
  controller: function($timeout){
    this.$onInit = function(){
      var vm = this;
      $timeout(function(){
         Wistia.embeds.setup();
         Wistia.api(vm.hashedId);
      }, 1000);
    };
  }
});

export default 'ngWistia';