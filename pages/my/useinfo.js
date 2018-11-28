loader.define(function(require,exports,module) {
	var islogin = tokenstorage.get("tokens");
	var denglu = function(xhr) {
				xhr.setRequestHeader('token', islogin);
				xhr.setRequestHeader('clientid', 'testclient')
	};
    var poweruse;
	var oldids;
	var ident;
    var fb = false;
	var useinfodata = {
		   useinfo:[],
           faceimgold:"",
           faceimg:"",
           poweruse_z:""
	}
	var myindex = new Vue({
		el:"#useinfo",
		data:useinfodata ,
        methods: {
        	saveuse:function(){
                if(!fb){
                   var pic = "";
                }else{
                  var pic = useinfodata.faceimg
                }
        		if(oldids == useinfodata.useinfo.identity_card){
        			ident = {
        				nick:useinfodata.useinfo.nick,
        		    	real_name:useinfodata.useinfo.real_name,
        		    	mobile:useinfodata.useinfo.mobile,
        		    	avatar:pic,
        		    	brand_name:useinfodata.useinfo.brandName
        			}
        		}else{
        			ident = {
        				nick:useinfodata.useinfo.nick,
        		    	real_name:useinfodata.useinfo.real_name,
        		    	mobile:useinfodata.useinfo.mobile,
        		    	identity_card:useinfodata.useinfo.identity_card,
        		    	avatar:pic,
        		    	brand_name:useinfodata.useinfo.brandName
        			}
        		}
        		bui.ajax({
        		    url: apiUrl + "/mapi/user/edit",
        		    data:ident,
        		    beforeSend: denglu,
        		    method: "post"
        		}).then(function(result){
        		    if(result.code == 0){
        		    	bui.alert("修改成功",function(){
        		    		router.back({
											name:"houseindex",
											callback: function(mod) {
												console.log(mod)
												mod.pageview.$options.mounted[0]()
											}
										})
        		    	});
        		    }else{
        		    	bui.alert(result.msg)	
        		    }
        		},function(result,status){
        		    //console.log(status)//"timeout"
        		});
        	}
		},
		mounted:function(){
        	bui.ajax({
        	    url: apiUrl + "/mapi/user/info",
        	    data: {},
        	    method: "POST",
				dataType: "json",
				beforeSend: denglu,
        	}).then(function(result){
        	    if(result.code==0){
                    
        	    	useinfodata.useinfo = result.data;
        	    	oldids = result.data.identity_card;
                    if(result.data.son == 0){
                            poweruse = 0
                        }else{
                            poweruse = 1
                        }
                     useinfodata.poweruse_z = poweruse;
                    if(result.data.avatar ==""){
                        useinfodata.faceimg ="http://app.gy.ffw.com.cn/images/icon/face.png"
                    }else{
                        useinfodata.faceimg = result.data.picDomain + result.data.avatar
                    }
        	    }else{
                    bui.alert(result.msg)
                }
        	},function(result,status){
        	    //console.log(status)//"timeout"
        	});
        	    $('#cameraInput').change(function(){
        var data = new FormData($('#datas')[0]);
        $.ajax({
				url: apiUrl + "/mapi/upload/img",
				type: "post",
				data: data,
				cache: false,
				beforeSend: denglu,
				processData: false,
				contentType: false,
				dataType:'json',
				success: function(data) {
					useinfodata.faceimg = data.data.url;
                    fb =true

				},
				error: function(e) {
					alert("网络错误，请重试！！");
				}
			});
    });
		}
	})




})