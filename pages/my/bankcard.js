loader.define(function (require, exports, module){
	var islogin = tokenstorage.get("tokens");
	var denglu = function(xhr) {xhr.setRequestHeader('token', islogin);xhr.setRequestHeader('clientid', 'testclient')};
	var mycarddata = {
	 	nonecard:0,
	 	cardinfo:[]
	};
	function carddata(){
		bui.ajax({
		    url: apiUrl + "/mapi/user/bankInfo",
		    data: {},
		    method: "post",
		    beforeSend: denglu,
		}).then(function(result){
		    if(result.code == 0){
		    	if(result.data.card_number){
		    		mycarddata.nonecard = 1;
					mycarddata.cardinfo = result.data;
		    	}else{
		    		mycarddata.nonecard = 0
		    	}
		    }else{
		    	bui.alert(result.msg);
		    }
		},function(result,status){
		    //console.log(status)//"timeout"
		});
	}
	 var mycard = new Vue({
	 	el:"#bankcard",
	 	data:mycarddata,
	 	methods:{},
	 	mounted:function(){
			carddata();
	 	}
	 })
	 return{
        pageName:"bankcard",
        pageview: mycard
    }
})