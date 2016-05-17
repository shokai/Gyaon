$(function(){		
		var audioContext = new AudioContext;
		var recorder = new Recorder(audioContext);

		$('#rec').mousedown(function(e){
			recorder.recStart();
			console.log("a");
			});
		$('#rec').mouseup(function(e){
			recorder.recStop();
			var src = audioContext.createBufferSource();
			src.buffer = recorder.getAudioBuffer();
			src.connect(audioContext.destination);
			src.start();
			});

		//TODO jQueryでかく
		var memos = document.getElementsByClassName("memo");
		for(var i = 0; i < memos.length; i++){
		memos[i].onmouseenter = function(e){
		this.children[0].play();
		this.setAttribute("id", "playng");
		}
		memos[i].onmouseout = function(e){
			this.children[0].pause();
			this.children[0].currentTime = 0;
			this.removeAttribute("id");
		}
		}
});
