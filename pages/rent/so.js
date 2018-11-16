loader.define(function(require, exports, module) {
	var arr = [];
	var islogin = tokenstorage.get("tokens");
	var uiListso;
	var sodata = new Vue({
		el: "#so",
		data: {
			houselist: [],
			noneshow: 1,
			btnshow: ''
		},
		methods: {
			openroom: function(index, indexs, event,dataids) {
                var divheight = "<div class='h260'></div>"
                if (this.btnshow == dataids) {
                    this.btnshow = "-1";
                    $(event.currentTarget).removeClass("openbigroom");
                } else {
                    this.btnshow = dataids;
                    $(".rooms").removeClass("openbigroom");
                    var tt = $(event.currentTarget).index() % 3;
                    $(event.currentTarget).addClass("openbigroom");
                    $(event.currentTarget).find(".btns").css('left', -2.44 * tt - 0.07 + 'rem');
                    $(event.currentTarget).find(".jt").css('left', 2.44 * tt + 1.12 + 'rem');
                }

            },
			roominfo: function(e) {
				router.load({
					url: "pages/rent/roominfo.html",
					param: {
						id: e
					}
				});
			},
			htinfo: function(e, htid) {
				router.load({
					url: "pages/rent/contractinfo.html",
					param: {
						id: e,
						htid: htid
					}
				});
			},
			gotoaddroom:function(id){
                bui.load({url:"pages/rent/addroom",param:{roomid:id} });
            },
			 gotohouseinfo:function(id){
                bui.load({url:"pages/rent/houseinfo",param:{rentid:id} });
            },
			qyue: function(e, htid) {
				router.load({
					url: "pages/rent/addcontract.html",
					param: {
						id: e,
						htid: htid
					}
				});
			}

		},
		mounted: function() {
			var that = this
			var uiSearchbar = bui.searchbar({
				id: "#searchbar",
				onInput: function(ui, keyword) {
					//实时搜索
					//console.log(keyword)
				},
				onRemove: function(ui, keyword) {
					//删除关键词需要做什么其它处理
					// console.log(keyword);
				},
				callback: function(ui, keyword) {
					$("#scrollso .bui-list").empty();
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
							id: "#scrollso",
							url: apiUrl + "/mapi/rent/rent",
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
								console.log(data)
								if (data.code == 0) {
									if (data.data == 0) {
										that.noneshow = 0;
									} else {
										that.noneshow = 1;
										console.log(data)
										console.log(data.data.rent)
										for(var i=0; i<data.data.rent.length;i++){
					                        that.houselist.push(data.data.rent[i])
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
        pageName:"so",
        pageview: sodata
    }
})