loader.define(function(require, exports, module) {
	 var params = router.getPageParams();	
	 var islogin = tokenstorage.get("tokens");
	 var denglu = function(xhr) {
			xhr.setRequestHeader('token', islogin);
			xhr.setRequestHeader('clientid', 'testclient')
		}
	 var urltest = params.ifrurl;
	 var types = params.types;
	 var ifr = new Vue({
	 	el: "#ifrs",
	 	data:{
	 		urls:""
	 	},
	 	methods:{},
	 	mounted:function(){
	 		if(types == 1){
	 			this.urls = urltest +"&token=" + islogin +"&clientid=testclient"
	 		}else{
	 			this.urls = urltest
	 		}
	 		
	 	}
	 })
})