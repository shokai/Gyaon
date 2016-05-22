(function(){
  function UserMediaResolver () {

  }
  function resolveGetUserMedia() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
       return navigator.mediaDevices.getUserMedia(opts).then(success).catch(fail);
    } else if (navigator.getUserMedia) {
       return avigator.getUserMedia;
    } else {
      return navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    }
  }
  UserMediaResolver.getUserMedia= function(opts, success, fail) {
    // for modern Firefox
    var getUserMedia = resolveGetUserMedia();
    if (typeof getUserMedia === "function" ) {
      var argsCount = getUserMedia.length;
      switch (argsCount) {
        case 0: {
          
        }
          break;
        default:

      }
    }
  };
  window.UserMediaResolver = UserMediaResolver;
}).call(this);
