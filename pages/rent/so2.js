loader.define(function(require, exports, module) {
	var arr = [];
	var islogin = tokenstorage.get("tokens");
	var uiListso;
	var sodata2 = new Vue({
		el: "#so2",
		data: {
			houselist: [],
			noneshow: 1,
			btnshow: ''
		},
		methods:  {
             gotoaddroom:function(id){
                bui.load({url:"pages/rent/addroom",param:{roomid:id} });
            },
            gotohouseinfo:function(id){
                bui.load({url:"pages/rent/houseinfo",param:{rentid:id} });
            },
            openroom: function openroom(roomid, event) {
                var divheight = "<div class='h260'></div>";
                //alert(roomid)
                if (this.btnshow == roomid) {
                    this.btnshow = "-1";
                    $(event.currentTarget).removeClass("openbigroom");
                } else {
                    this.btnshow = roomid;
                    $(".rooms").removeClass("openbigroom");
                    var tt = $(event.currentTarget).index() % 3;
                    $(event.currentTarget).addClass("openbigroom");
                    $(event.currentTarget).find(".btns").css('left', -2.44 * tt - 0.07 + 'rem');
                    $(event.currentTarget).find(".jt").css('left', 2.44 * tt + 1.12 + 'rem');
                }
            },
            roominfo: function roominfo(e,htid) {
                router.load({ url:"pages/rent/roominfo.html", param: {id:e,htid:htid}});
            },
            htinfo: function htinfo(e, htid) {
                router.load({ url: "pages/rent/contractinfo.html", param: { id: e, htid: htid } });
            },
            qyue: function qyue(e, htid) {
                router.load({ url: "pages/rent/addcontract.html", param: { id: e, htid: htid } });
            }
        },
		mounted: function() {
			var that = this
			var uiSearchbar = bui.searchbar({
				id: "#searchbar",
				callback: function(ui, keyword) {
					$("#scroll2 .bui-list").empty();
					if (uiListso) {
						// 重新初始化数据
						uiListso.init({
							page: 1,
							data: {
								kw: keyword
							}
						});

					} else {
						uiListso && uiListso.destroy();
						uiListso = bui.list({
							id: "#scroll2",
							url: apiUrl + "/mapi/rent/rentList",
							method: "post",
							headers: {
								clientid: "testclient",
								token: islogin
							},
							data: {
								kw: keyword
							},
							field: {
								page: 'page',
								data: "data.rent"
							},
							page:1,
							pageSize: 20,
							refresh: false,
							onLoad: function(scroll, data) {
								if (data.code == 0) {
									if (data.data == 0) {
										that.noneshow = 0;
									} else {
										that.noneshow = 1;
										 for (var i = 0; i < data.data.rent.length; i++) {
					                        that.houselist.push(data.data.rent[i]);
					                    }
									}
								} else {
									bui.alert(result.msg, function(e) {
										tokenstorage.remove("tokens");
										window.location.href = domains;

									});
								}

							}
						})
					};

				}
			});
		}
	})
	return{
        pageName:"so2",
        pageview: sodata2
    }
})