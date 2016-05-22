$(function() {
  var getUserMedia = UserMediaResolver.getUserMedia;
  var $recordButton = $("#recordButton");
  var permissionResolved = false;
  var audioContext = new AudioContext();
  var exporter = new AudioExporter();
  var recorder = new AudioRecorder({
    audioContext: audioContext
  });
  var stream;
  // 録音のパーミッションをリクエストする
  var requestPermission = function(success, fail) {
    getUserMedia({
      video: false,
      audio: true
    }, success, fail);
  };
  // 録音のパーミッションの状態を設定する
  var setPermissionResolved = function(resolved) {
      permissionResolved = resolved;
      if (resolved) {
        $recordButton.removeAttr("disabled");
      } else {
        $recordButton.attr("disabled", "disabled");
      }
    };
    // マイクのパーミッションをリクエスト
  requestPermission(function(localMediaStream) {
    setPermissionResolved(true);
    stream = localMediaStream;
  }, function(err) {
    setPermissionResolved(false);
    console.error(err);
  });
  // 録音ボタン
  $recordButton.mousedown(function(e) {
    if (permissionResolved) {
      recorder.start(stream);
    }
  }).mouseup(function(e) {
    recorder.stop();
    var src = audioContext.createBufferSource();
    var buf = recorder.getAudioBuffer();
    src.buffer = buf;
    src.connect(audioContext.destination);
    src.start();
    var blob = exporter.exportBlob(
      recorder.getAudioBufferArray(),
      audioContext.sampleRate
    );
    // file名は使ってない
    var formData = new FormData();
    formData.append("file", blob, "hoge.wav");
    $.ajax("/upload", {
      method: "POST",
      data: formData,
      processData: false,
      contentType: false
    }).done(function(done) {
      console.log(done);
      var memo = $("<li class=\"memo\">" + done.file + "<audio src=\"/mp3/" + done.file + "\" /></li>");
      $("#memos").prepend(memo);
    }).fail(function(e) {
      alert("export failed");
    });
    console.log(blob);
  });
  // 録音一覧
  $(document).on("mouseenter mouseout", ".memo", function(e) {
    var $this = $(this);
    var audio = $this.find("audio")[0];
    switch (e.type) {
      case "mouseenter":
        {
          audio.play();
          $this.attr("data-playing", true);
        }
        break;
      case "mouseout":
        {
          $this.removeAttr("data-playing");
          audio.pause();
          audio.currentTime = 0;
        }
        break;
      default:
    }
  });
});
