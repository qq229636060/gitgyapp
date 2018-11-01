loader.define(function(require, exports, module) {
	var uiList2;
	var islogin = tokenstorage.get("tokens");
    var params = router.getPageParams();
    var rentid = params.rentid;
    var hovercur = params.use;
    console.log(hovercur)
    var htid = params.ht_id;
    var disabledarr = [];
    var arr_cur = [];
	var tuoguan = new Vue({
		el:"#yz_tuoguan",
		data:{
			houselist:[]
		},
		methods:{
			saves:function(){
                $(".zzs .cursz").each(function(idx){
                    console.log(idx)
                    arr_cur.push($(".zzs .cursz").eq(idx).attr("data-id"))
                });
                router.back({
                      name: "houseindex",
                       callback: function(mod) {
                         mod.tgroom(arr_cur)
                        }
                    })

            }
		},
		mounted:function(){
		var that = this;
		uiList2 && uiList2.destroy();
        that.houselist = [];
        uiList2 = bui.list({
            id: "#scroll2",
            url: apiUrl + "/mapi/rent/rentRoomList",
            method: "POST",
            headers: {
                clientid: "testclient",
                token: islogin
            },
            page: 1,
            pageSize:20,
            data: {
                rent_id:rentid,
                owner_id:htid
            },
            //如果分页的字段名不一样,通过field重新定义
            field: {
                page: "page",
                data: "data.list"
            },
            autoScroll: true,
            refresh: false,
            onLoad: function onLoad(scroll, data) {
                if (data.code == 0) {
                     for (var i = 0; i < data.data.list.length; i++) {
                           for(var k=0; k<data.data.list[i].roomList.length; k++){
                                if(data.data.roomDisabled.indexOf(data.data.list[i].roomList[k].id) != '-1'){
                                    data.data.list[i].roomList[k].st = 0;
                                }
                                if(hovercur.indexOf(data.data.list[i].roomList[k].id) != '-1'){
                                    data.data.list[i].roomList[k].st = 2;
                                }
                           }   
                           disabledarr.push(data.data.list[i]);
                      } 
                    
                      $(".zzs").on("click",".rooms",function(){
                        if($(this).hasClass("nones")){
                            return false;
                        }
                        if($(this).hasClass("cursz")){
                            $(this).removeClass("cursz")
                        }else{
                             $(this).addClass("cursz")
                        }
                    })
                    that.houselist = disabledarr;
                    
                }
            }

        });
		}
	})
})