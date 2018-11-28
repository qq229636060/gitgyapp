loader.define(function (require, exports, module){
	$(".tuichu").click(function(){
		 tokenstorage.remove("tokens");
         window.location.href = domains ;
	})
})