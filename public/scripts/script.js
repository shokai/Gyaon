var memos;

window.onload = function(){
  memos = document.getElementsByClassName("memo");
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
  };
}
