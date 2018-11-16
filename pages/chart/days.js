'use strict';

loader.define(function (require, exports, module) {
	var islogin = tokenstorage.get("tokens");
	var denglu = function denglu(xhr) {
		xhr.setRequestHeader('token', islogin);xhr.setRequestHeader('clientid', 'testclient');
	};
	var thatz;
	var monthdatas = {
		mdata: "",
		monthtime: "",
		mcaiwudata: "",
		st: "",
		st1: "",
		powerday: "",
		powerday1: ""
	};
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	if (month == 1) {
		var newmonth = 12;
	} else {
		if (month <= 10) {
			var newmonth = "0" + month;
		} else {
			var newmonth = month;
		}
	};
	if (day < 10) {
		var newday = "0" + day;
	} else {
		var newday = day;
	}
	function getmonth(thisz) {
		thisz.$nextTick(function () {
			if (power_report_operate_month != 1) {
				monthdatas.monthtime = uitime.value();
				//日运营
				bui.ajax({
					url: apiUrl + "/mapi/report/operateDay",
					data: {
						mode: mode,
						time: monthdatas.monthtime
					},
					beforeSend: denglu,
					method: "post"
				}).then(function (result) {
					if (result.code == 0) {
						console.log(result);
						monthdatas.st = result.data.st;
						monthdatas.mdata = result.data.list;
					} else {
						bui.alert(result.msg);
					}
				}, function (result, status) {
					//console.log(status)//"timeout"
				});
			} else {
				monthdatas.powerday = 0;
			}
			//日财务
			if (power_report_finance_day != 1) {
				bui.ajax({
					url: apiUrl + "/mapi/report/financeDay",
					data: {
						mode: mode,
						time: monthdatas.monthtime
					},
					beforeSend: denglu,
					method: "post"
				}).then(function (result) {
					if (result.code == 0) {
						monthdatas.st1 = result.data.st;
						monthdatas.mcaiwudata = result.data.list;
					} else {
						bui.alert(result.msg);
					}
				}, function (result, status) {
					//console.log(status)//"timeout"
				});
			} else {
				monthdatas.powerday1 = 0;
			}
			var uiSlideTab = bui.slide({
				id: "#uiSlideTab",
				menu: ".bui-nav",
				children: ".bui-tab-main > ul",
				scroll: true
			});
		});
	}
	var monthchart = new Vue({
		el: "#days",
		data: monthdatas,
		methods: {},
		mounted: function mounted() {
			thatz = this;
			getmonth(thatz);
		}
	});
	var inputs = $("#xztime");
	var uitime = bui.pickerdate({
		handle: "#xztime",
		// input 显示的日期格式
		formatValue: "yyyy-MM-dd",
		rotateEffect: true,
		value: year + '-' + newmonth + '-' + newday,
		max: year + '-' + newmonth + '-' + newday,
		cols: {
			hour: "none",
			minute: "none",
			second: "none"
		},
		onChange: function onChange(value) {
			inputs.val(value);
			monthdatas.monthtime = value;
		},
		callback: function callback(value) {
			inputs.val(value);
			monthdatas.monthtime = inputs.val(value);
			getmonth(thatz);
		}
	});
	var uiActionsheet = bui.actionsheet({
		trigger: "#editday",
		buttons: [{ name: "月报表", value: "1" }, { name: "日报表", value: "2" }],
		callback: function callback(e, ui) {
			var val = $(this).attr("value");
			if (val == "cancel" || val == "2") {
				ui.hide();
			}
			if (val == "1") {
				ui.hide();
				if (power_report_operate_month == 1 && power_report_finance_month == 1) {
					bui.alert("你没有权限查看");
					return false;
				}
				router.replace({ url: "pages/chart/month.html", param: {} });
			}
		}
	});
	uitime.on("show", function () {
		uiActionsheet.hide();
		$("#editday").hide();
	});
	uitime.on("hide", function () {
		uiActionsheet.hide();
		$("#editday").show();
	});
});