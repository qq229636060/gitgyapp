"use strict";

loader.define(function (require, exports, module) {
	var islogin = tokenstorage.get("tokens");
	mode = router.getPageParams().mode;
	var fast = new Vue({
		el: "#fast",
		data: {
			lefthouse: [],
			rightroom: [],
			lefthouse2: [],
			rightroom2: [],
			nows: "",
			mode: mode
		},
		methods: {
			clickleft: function clickleft(id) {
				var that = this;
				that.nows = id;
				bui.ajax({
					url: apiUrl + "/mapi/rent/rent",
					data: {
						type: 0,
						rcid: id,
						page: 1
					},
					headers: {
						clientid: "testclient",
						token: islogin
					},
					method: "post"
				}).then(function (result) {
					if (result.code == 0) {
						console.log(result);
						that.rightroom = result.data.rent;
					} else {
						bui.alert(result.msg);
					}
				}, function (result, status) {
					//console.log(status)//"timeout"
				});
			},
			clickleft2: function clickleft2(id) {
				var that = this;
				that.nows = id;
				bui.ajax({
					url: apiUrl + "/mapi/rent/rentList",
					data: {
						type: 0,
						rid: id,
						page: 1
					},
					headers: {
						clientid: "testclient",
						token: islogin
					},
					method: "post"
				}).then(function (result) {
					if (result.code == 0) {
						console.log(result);
						that.rightroom2 = result.data.rent[0].floor;
					} else {
						bui.alert(result.msg);
					}
				}, function (result, status) {
					//console.log(status)//"timeout"
				});
			},
			gotoht: function gotoht(roomid, htid) {

				router.load({ url: "pages/rent/addcontract.html", param: { id: roomid, htid: htid } });
			}
		},
		mounted: function mounted() {
			var that = this;
			if (mode == 1) {
				bui.ajax({
					url: apiUrl + "/mapi/home/homeRentList",
					data: {
						mode: mode
					},
					headers: {
						clientid: "testclient",
						token: islogin
					},
					method: "post"
				}).then(function (result) {
					if (result.code == 0) {
						console.log(result);
						that.lefthouse = result.data;
						that.nows = result.data[0].id;
					} else {
						bui.alert(result.msg);
					}
				}, function (result, status) {
					//console.log(status)//"timeout"
				});
			} else {
				bui.ajax({
					url: apiUrl + "/mapi/home/homeRentList",
					data: {
						mode: mode
					},
					headers: {
						clientid: "testclient",
						token: islogin
					},
					method: "post"
				}).then(function (result) {
					if (result.code == 0) {
						console.log(result);
						that.lefthouse2 = result.data;
						that.nows = result.data[0].id;
					} else {
						bui.alert(result.msg);
					}
				}, function (result, status) {
					//console.log(status)//"timeout"
				});
			}
		}
	});
	return {
		pageName: "fast",
		pageview: fast
	};
});