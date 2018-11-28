loader.define(function(require, exports, module) {
	var arr = [];
	var islogin = tokenstorage.get("tokens");
	var uiListsohouse;
	var params = router.getPageParams();
	var cityid = params.city;
	var sodata = new Vue({
		el: "#so",
		data: {
			houselist: [],
			noneshow: 1,
			btnshow: ''
		},
		methods: {
			getinfo:function(housename,houseadder,quid,bkid,cityid,houseid){
				 	router.back({
				    callback: function(mod){
				    	mod.pageview(housename,houseadder,quid,bkid,cityid,houseid)
				     }
				})
			}
		},
		mounted: function() {
			var that = this
			var uiSearchbar = bui.searchbar({
				id: "#housesearchbar",
				onInput: function(ui, keyword) {
					
				},
				onRemove: function(ui, keyword) {
					//删除关键词需要做什么其它处理
					// console.log(keyword);
				},
				callback: function(ui, keyword) {
					$("#scrollsohouse .bui-list").empty();
					 bui.ajax({
					     url: apiUrl + "/mapi/common/soCell",
					     data: {
					     	city:cityid,
					        kw: keyword
					     },
					     headers: {
					 			clientid: "testclient",
					 			token: islogin
					 	},
					     method: "post"
					 }).then(function(result){
					     if (result.code == 0) {
					     			if(result.data.length == 0){
					     				sodata.noneshow = 0;
					     				return false
					     			}else{
					     				sodata.noneshow = 1;
					     				that.houselist = result.data;
						 				$.each(that.houselist,function(idx){
						 					that.houselist[idx].cityid = cityid
						 				})
					     			}
					 				
					 			} else {
					 				bui.alert(result.msg, function(e) {
					 					tokenstorage.remove("tokens");
					 					window.location.href = domains;
									});
							}
					 },function(result,status){
					    
					 });
					
				}
			});
		}
	})

})