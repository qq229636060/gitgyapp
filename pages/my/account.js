'use strict';

loader.define(function (require, exports, module) {
	var islogin = tokenstorage.get("tokens");
	var denglu = function denglu(xhr) {
		xhr.setRequestHeader('token', islogin);
		xhr.setRequestHeader('clientid', 'testclient');
	};
	var datePrevVal;
	function getdate() {
		bui.ajax({
			url: apiUrl + "/mapi/user/account",
			data: {
				dateType: 1,
				channel: datas.c3,
				order_status: datas.c2,
				order_type: datas.c1,
				date: datas.years + '-' + datas.month
			},
			beforeSend: denglu,
			//这里设置header
			method: "post"
		}).then(function (result) {
			if (result.code == 0) {
				datas.balance = result.data.balance;
				datas.valid = result.data.valid;
				datas.cush = result.data.cush;
				var orderStatus = [];
				var orderType = [];
				var paySource = [];
				datas.housebox = result.data.listInfo.data;
				for (var i in result.data.orderStatus) {
					orderStatus.push({
						name: result.data.orderStatus[i],
						val: i
					});
				}
				for (var k in result.data.orderType) {
					orderType.push({
						name: result.data.orderType[k],
						val: k
					});
				}
				for (var k in result.data.paySource) {
					paySource.push({
						name: result.data.paySource[k],
						val: k
					});
				}
				datas.orderStatus = orderStatus;
				datas.orderType = orderType;
				datas.paySource = paySource;
				if (result.data.listInfo.count == "0") {
					datas.none = '1';
				} else {
					datas.none = '0';
				}
			} else {
				bui.alert(result.msg);
			}
		}, function (result, status) {});
	}
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month;
	var datas = {
		housebox: [],
		orderStatus: "",
		orderType: "",
		paySource: "",
		balance: '',
		valid: '',
		hstatus: "",
		hxtype: "",
		years: year,
		month: month,
		show: 5,
		now: '-1',
		now1: '-1',
		now2: '-1',
		mylist: "",
		none: "",
		c1: "2",
		c2: "",
		c3: "",
		cush: ""
	};
	var account = new Vue({
		el: "#account",
		data: datas,
		methods: {
			navs: function navs(indexs) {
				if (datas.show < 4) {
					datas.show = 5;
				} else {
					datas.show = indexs;
				}
			},
			overselcet: function overselcet(indexs, text, now, dataids) {
				$(".k" + indexs).html(text);
				datas.show = 5;
				if (indexs == '1') {
					datas.now = now;
					datas.c1 = dataids;
				} else if (indexs == '2') {
					datas.now1 = now;
					datas.c2 = dataids;
				} else {
					datas.now2 = now;
					datas.c3 = dataids;
				}
				//datas.houselist.length = 0;
				getdate();
			},
			gotoinfos: function gotoinfos(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13) {
				router.load({
					url: "pages/my/accountinfo.html",
					param: { c1: c1, c2: c2, c3: c3, c4: c4, c5: c5, c6: c6, c7: c7, c8: c8, c9: c9, ts: datas.c1, c10: c10, c11: c11, c12: c12, c13: c13 }
				});
			}
		},
		mounted: function mounted() {
			getdate();
		}
	});

	var dateinputs = $("#msgtimes");
	var uiPickerdate = bui.pickerdate({
		handle: "#msgtimes",
		min: "2016/1/1",
		max: currentdate,
		cols: {
			date: "none",
			hour: "none",
			minute: "none",
			second: "none"
		},
		onChange: function onChange(value) {},
		buttons: ["取消", "确定"],
		callback: function callback() {
			if ($(this).text().trim() == "取消") {
				uiPickerdate.value(datePrevVal);
			} else {
				datePrevVal = uiPickerdate.value();
				datePrevVal.slice(0, 3);
				datas.years = datePrevVal.slice(0, 4);
				datas.month = datePrevVal.slice(5, 7);
				getdate();
			}
		}
	});
});