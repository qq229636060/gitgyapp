"use strict";

loader.define(function (require, exports, module) {
	mode = router.getPageParams().mode;
	var islogin = tokenstorage.get("tokens");
	var typesrel = 1;
	var reldata = {
		houselist: [],
		navs: 1,
		btnshow: 0
	};
	var roomarr = [];
	var uiListrel = false;
	function getreldata() {
		reldata.btnshow = 0;
		uiListrel && uiListrel.destroy();
		reldata.houselist = [];
		uiListrel = bui.list({
			id: "#scroll",
			url: apiUrl + "/mapi/room/pushManage",
			headers: {
				clientid: "testclient",
				token: islogin
			},
			method: "post",
			data: {
				mode: mode,
				pushType: typesrel
			},
			page: 1,
			refresh: false,
			field: {
				page: "page",
				data: "data.rent"
			},
			onLoad: function onLoad(scroll, data) {
				if (data.code == 0) {
					$.each(data.data.rent, function (idx) {
						reldata.houselist.push(data.data.rent[idx]);
					});
				} else if (data.code == "-86") {
					bui.alert(data.msg, function () {
						bui.back();
					});
				} else {
					bui.alert(data.msg, function (e) {
						tokenstorage.remove("tokens");
						window.location.href = domains;
					});
				}
			}
		});
	}
	var moneyinfos = new Vue({
		el: "#rel",
		data: reldata,
		methods: {
			gotoaddroom: function gotoaddroom(id) {
				if (power_rent_room_edit == 1) {
					bui.alert("你没有权限编辑");
					return false;
				}
				bui.load({ url: "pages/rent/addroom", param: { roomid: id } });
			},
			navrel: function navrel(types) {
				typesrel = types;
				reldata.navs = types;
				getreldata();
			},
			openroom: function openroom(roomid) {
				if (reldata.btnshow == roomid) {
					reldata.btnshow = "0";
					$(event.currentTarget).removeClass("openbigroom");
				} else {
					reldata.btnshow = roomid;
					$(".rooms").removeClass("openbigroom");
					var tt = $(event.currentTarget).index() % 3;
					$(event.currentTarget).addClass("openbigroom");
					$(event.currentTarget).find(".btns").css('left', -2.44 * tt - 0.07 + 'rem');
					$(event.currentTarget).find(".jt").css('left', 2.44 * tt + 1.12 + 'rem');
				}
			},
			shuaxin: function shuaxin(roomid) {
				if (power_rent_list_refresh == 1) {
					bui.alert("你没有权限刷新");
					return false;
				}
				roomarr[0] = roomid;
				bui.confirm("是否刷新房源", function (ui) {
					var text = $(this).text();
					if (text == "确定") {
						bui.ajax({
							url: apiUrl + "/mapi/room/refresh",
							data: {
								mode: mode,
								ids: roomarr
							},
							headers: {
								clientid: "testclient",
								token: islogin
							},
							method: "post"
						}).then(function (result) {
							if (result.code == 0) {
								bui.alert(result.msg, function () {
									getreldata();
								});
							} else {
								bui.alert(result.msg);
							}
						}, function (result, status) {
							//console.log(status)//"timeout"
						});
					}
					ui.close();
				});
			},
			xiajia: function xiajia(roomid) {
				if (power_rent_list_down == 1) {
					bui.alert("你没有权限下架");
					return false;
				}
				roomarr[0] = roomid;
				bui.confirm("是否下架房源", function (ui) {
					var text = $(this).text();
					if (text == "确定") {
						bui.ajax({
							url: apiUrl + "/mapi/room/down",
							data: {
								mode: mode,
								ids: roomarr
							},
							headers: {
								clientid: "testclient",
								token: islogin
							},
							method: "post"
						}).then(function (result) {
							if (result.code == 0) {
								bui.alert(result.msg, function () {
									getreldata();
								});
							} else {
								bui.alert(result.msg);
							}
						}, function (result, status) {
							//console.log(status)//"timeout"
						});
					}
					ui.close();
				});
			},
			editroom: function editroom(roomids) {
				if (power_rent_room_edit == 1) {
					bui.alert("你没有权限编辑");
					return false;
				}
				reldata.btnshow = 0;
				bui.load({ url: "pages/rent/addroom.html", param: { roomid: roomids } });
			},
			gotof5: function gotof5() {
				if (power_rent_list_refresh == 1) {
					bui.alert("你没有权限刷新");
					return false;
				}
				bui.load({ url: "pages/release/refresh.html", param: { mode: 1 } });
			},
			fb: function fb(roomid) {
				bui.ajax({
					url: apiUrl + "/mapi/room/push",
					data: {
						mode: mode,
						id: roomid
					},
					headers: {
						clientid: "testclient",
						token: islogin
					},
					method: "post"
				}).then(function (result) {
					if (result.code == 0) {
						bui.alert("发布成功", function () {
							moneyinfos.$options.mounted[0]();
						});
					} else {
						bui.alert(result.msg);
					}
				}, function (result, status) {
					//console.log(status)//"timeout"
				});
			}
		},
		mounted: function mounted() {
			getreldata();
		}
	});
	return {
		pageName: "relpages",
		pageview: moneyinfos
	};
});