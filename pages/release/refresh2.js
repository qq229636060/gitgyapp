"use strict";

loader.define(function (require, exports, module) {
	mode = router.getPageParams().mode;
	var islogin = tokenstorage.get("tokens");
	var reldataz = {
		houselist: []
	};
	var roomarrz = [];
	var uiListrez = false;
	function getreldataz() {
		reldataz.btnshow = 0;
		uiListrez && uiListrez.destroy();
		reldataz.houselist = [];
		uiListrez = bui.list({
			id: "#scrollz",
			url: apiUrl + "/mapi/room/pushManage",
			headers: {
				clientid: "testclient",
				token: islogin
			},
			method: "post",
			data: {
				mode: mode,
				pushType: "2"
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
						reldataz.houselist.push(data.data.rent[idx]);
					});
				} else {
					bui.alert(data.msg);
				}
			}
		});
	}
	var refresh = new Vue({
		el: "#refresh",
		data: reldataz,
		methods: {
			clickroom: function clickroom() {
				if ($(event.currentTarget).hasClass("curs_z")) {
					$(event.currentTarget).removeClass("curs_z");
				} else {
					$(event.currentTarget).addClass("curs_z");
				}
			},
			f5: function f5() {
				roomarrz = [];
				$("#scrollz .curs_z").each(function (idx) {
					roomarrz[idx] = $("#scrollz .curs_z").eq(idx).attr("data-roomsid");
				});
				if (roomarrz.length == 0) {
					bui.alert("请选择房间");
					return false;
				}
				bui.ajax({
					url: apiUrl + "/mapi/room/refresh",
					data: {
						mode: mode,
						ids: roomarrz
					},
					headers: {
						clientid: "testclient",
						token: islogin
					},
					method: "post"
				}).then(function (result) {
					if (result.code == 0) {
						bui.alert(result.msg);
						$("#scrollz .rooms ").removeClass("curs_z");
					} else {
						bui.alert(result.msg);
					}
				}, function (result, status) {
					//console.log(status)//"timeout"
				});
			}
		},
		mounted: function mounted() {
			getreldataz();
		}
	});
	return {
		pageName: "refresh",
		pageview: refresh
	};
});