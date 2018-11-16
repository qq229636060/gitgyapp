loader.define(function (require, exports, module){
	var islogin = tokenstorage.get("tokens");
	var params = router.getPageParams();
	mode = params.mode;
    var houseid = params.id;
	var qyobj,bkobj,xqname,houseids,houseadders;
	var tjtrue = true;
    var arrpub = [];
    var jzpub_tj = [];
    var havepub = [];
	var getinfos = function(housename,houseadder,quid,bkid,cityid,houseid){
		bui.ajax({
		    url: apiUrl + "/mapi/common/citySelect",
		    data: {},
		    headers: {
                    clientid: "testclient",
                    token: islogin
            },
		    method: "post"
		}).then(function(result){
		    if(result.code==0){
		    	console.log(result.data.region[cityid]);
		    	$.each(result.data.region[cityid],function(idx){
		    		if(result.data.region[cityid][idx].id == quid){
		    			qyobj = result.data.region[cityid][idx]
		    		}
		    	})
		    	$.each(result.data.plate[quid],function(idx){
		    		if(result.data.plate[quid][idx].id == bkid){
		    			bkobj = result.data.plate[quid][idx]
		    		}
		    	})
		    	xqname = housename;
		    	houseids = houseid;
		    	houseadders = houseadder;
		    	$(".sohouse").html(housename);
				$(".qy").val(qyobj.name+bkobj.name);
				$(".dizhi").val(houseadder);
		    }else{
		    	bui.alert(result.msg);
		    }
		},function(result,status){
		    
		});
		
	}
    var addhousez = new Vue({
        el:"#addhouse_app",
        data:{
        	citys:"-1",
        	hezuselect:"1",
        	city:[],
        	province:"",
        	building:"",
        	unit:"",
        	floor:"",
        	number:"",
        	roomnum:"",
            mode:mode,
            roomshow:"0",
            //集中
            pub:[],
            gy_name:"",
            zfloor:"",
            zrooms:"",
            editshow:"0"
        },
        methods:{
        	goto_sohouse:function(){
        		if(this.citys == '-1'){
        			bui.alert("请选择城市");
        		}else{
        			bui.load({url:"pages/rent/addhouse_so.html",param:{city:this.citys}});
        		}
        	},
        	savehouse:function(){
        		    var that = this;
                    if(that.citys == "-1"){
                       bui.alert("请选择城市");
                       return false; 
                    }else if($(".sohouse").html()=="请选择小区"){
                        bui.alert("请选择小区");
                        return false; 
                    }
                    if(mode == 1){
        		    if(tjtrue){
        		    tjtrue = false
        			bui.ajax({
        			    url: apiUrl + "/mapi/rent/save",
        			    headers: {
		                    clientid: "testclient",
		                    token: islogin
		            	},
		            	method:"post",
        			    data: {
        			    	id:houseid,
        			    	province:that.province,
        			    	city:that.citys,
        			    	region:qyobj.id,
        			    	plate:bkobj.id,
        			    	cell_id:houseids,
        			    	cell_name:xqname,
        			    	cell_address:houseadders,
        			    	building:that.building,
        			    	unit:that.unit,
        			    	floor:that.floor,
        			    	number:that.number,
        			    	mold:that.hezuselect,
        			    	room:that.roomnum
        			    }
        			}).then(function(result){ 
        			    if(result.code == 0){
        			    	bui.hint({
						        timeout: 2000,
						        autoClose: true,
						        content: "<i class='icon-check'></i><br/>添加成功",
							 	position: "center",
							 	effect: "fadeInDown",      //不开启倒计时
						        onClose: function(){
						        		router.back({
                                        name:"houseindex",
								    	callback: function(mod){
                                               if($.isEmptyObject(mod)){
                                               }else{
                                                mod.pageview.$options.mounted[0]()
                                               } 
										    }
										})
								}
						    })
        			    }else{
        			    	tjtrue = true
        			    	bui.alert(result.msg);
        			    }

        			},function(result,status){
        			    //console.log(status)//"timeout"
        			});
        			}
                }else{
                     //集中式保存
                    if(tjtrue){
                        tjtrue = false;
                        $("#addpub .cur").each(function(index){
                            jzpub_tj.push($("#addpub .cur").eq(index).attr("data-id"))
                        })
                        bui.ajax({
                            url: apiUrl + "/mapi/rent/rentSave",
                            data: {
                              id:houseid,
                              province:that.province,
                              city:that.citys,
                              region:qyobj.id,
                              plate:bkobj.id,
                              apartment:that.gy_name,
                              cell_id:houseids,
                              cell_name:xqname,
                              cell_address:houseadders,
                              floor:that.zfloor,
                              room:that.zrooms,
                              public_area:jzpub_tj
                            },
                            headers: {
                                clientid: "testclient",
                                token: islogin
                             },
                            method: "POST"
                        }).then(function(result){
                            if(result.code == 0){
                                bui.hint({
                                timeout: 2000,
                                autoClose: true,
                                content: "<i class='icon-check'></i><br/>添加成功",
                                position: "center",
                                effect: "fadeInDown",      //不开启倒计时
                                onClose: function(){
                                        router.back({
                                        name:'houseindex',
                                        callback:function(mod){
                                                if($.isEmptyObject(mod)){
                                               }else{
                                                mod.pageview.$options.mounted[0]()
                                               } 
                                            }
                                        })
                                }
                            })
                            }else{
                            tjtrue = true
                            bui.alert(result.msg);
                        }
                        },function(result,status){
                            //console.log(status)//"timeout"
                        });
                    }
                }
        	}
        },
        mounted:function(){
        	var that = this;
 			bui.ajax({
 			    url: apiUrl + "/mapi/common/citySelect",
 			    data: {},
 			    headers: {
                    clientid: "testclient",
                    token: islogin
                },
 			    method: "post"
 			}).then(function(result){
 			    that.city = result.data.city[0];
 			    that.province = result.data.province[0].id
 			},function(result,status){
 			    //console.log(status)//"timeout"
 			});
            //编辑
            if(houseid){
 			bui.ajax({
                url: apiUrl + "/mapi/rent/rentEdit",
                data: {
                    rent_id:houseid,
                    mode:mode
                },
                headers: {
                    clientid: "testclient",
                    token: islogin
                },
                method: "POST"
            }).then(function(result){
                console.log(result)
                if(result.code==0){
                    if(mode == 1){
                        that.roomshow = 1;
                        that.citys = result.data.rent.city;
                        getinfos(result.data.rent.cell_name,result.data.rent.cell_address,result.data.rent.region,result.data.rent.plate,result.data.rent.city,result.data.rent.cell_id);
                        that.building = result.data.rent.building;
                        that.unit = result.data.rent.unit;
                        that.number = result.data.rent.number;
                        that.hezuselect = result.data.rent.mold;
                        that.floor = result.data.rent.floor;
                        that.roomnum = result.data.rent.room
                    }
                    if(mode == 2){
                        $.each(result.data.public_area,function(index){
                            arrpub.push({name:result.data.public_area[index],val:index}) 
                        })
                        that.pub = arrpub;
                        that.citys = result.data.rent.city;
                        getinfos(result.data.rent.cell_name,result.data.rent.cell_address,result.data.rent.region,result.data.rent.plate,result.data.rent.city,result.data.rent.cell_id);
                        that.gy_name = result.data.rent.apartment;
                        if(houseid){
                            that.editshow = 1
                        };
                        that.$nextTick(function(){
                         $("#addpub span").each(function(idx){
                            var curs = $("#addpub span").eq(idx).attr("data-id");
                            if(result.data.rent.public_area_info.indexOf(curs) != -1){
                               $("#addpub span").eq(idx).addClass("cur") 
                            }
                         })
                        })
                       
                    }
                }else{
                    bui.alert(result.msg);
                }
            },function(result,status){
                //console.log(status)//"timeout"
            });
            }else{
                bui.ajax({
                     url: apiUrl + "/mapi/rent/rentEdit",
                data: {
                    rent_id:houseid,
                    mode:mode
                },
                headers: {
                    clientid: "testclient",
                    token: islogin
                },
                method: "POST"
                }).then(function(result){
                    if(result.code == 0){
                        $.each(result.data.public_area,function(index){
                            arrpub.push({name:result.data.public_area[index],val:index}) 
                        })
                        that.pub = arrpub;
                    }else{
                        bui.alert(result.msg);
                    }
                },function(result,status){
                    //console.log(status)//"timeout"
                });
            }
        	$("#loc").on("click", function() {
				houseloc.show();
			})
            $("#addpub").on("click","span",function(){
                if($(this).hasClass("cur")){
                    $(this).removeClass("cur")
                }else{
                    $(this).addClass("cur")
                }
            })
			$("#rentfunction").on("click", function() {
				rentfunction.show();
			})

        }
    })
    return{
    	pageName:"addhouse",
        pageview:getinfos
    }
})