'use strict';

loader.define(function (require, exports, module) {
	var testmoblie = false;
	var islogin = tokenstorage.get("tokens");
	var denglu = function denglu(xhr) {
		xhr.setRequestHeader('token', islogin);xhr.setRequestHeader('clientid', 'testclient');
	};
	var arrbank = [];
	var clicktel = true;
	var bindcrad = new Vue({
		el: "#bindcard",
		data: {
			formboxs: {
				banks: "请选择",
				bankusename: "",
				bankname: "",
				bankid: "",
				banktel: "",
				bankyz: "",
				arrbank: []
			}
		},
		methods: {
			telfunction: function telfunction() {
				var sMobile = this.formboxs.banktel;
				if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(sMobile)) {
					testmoblie = true;
					return false;
				} else {
					testmoblie = false;
				}
			},
			submitcard: function submitcard() {
				var that = this;
				if (that.formboxs.banks == "请选择") {
					bui.alert("请选择银行");
				} else if (that.formboxs.bankusename == "") {
					bui.alert("请填写开户名");
				} else if (that.formboxs.bankid == "") {
					bui.alert("请输入银行卡号");
				} else if (testmoblie) {
					bui.alert("请输入正确的手机号码");
				} else if (that.formboxs.bankyz == "") {
					bui.alert("请填写验证码");
				} else {
					bui.ajax({
						url: apiUrl + "/mapi/user/bindBank",
						beforeSend: denglu,
						data: {
							bank_name: that.formboxs.banks,
							name: that.formboxs.bankusename,
							card_number: that.formboxs.bankid,
							mobile: that.formboxs.banktel,
							captcha: that.formboxs.bankyz,
							card_type: 1
						},
						method: "post"
					}).then(function (result) {
						if (result.code == 0) {
							bui.alert(result.msg);
						} else {
							bui.alert(result.msg);
						}
					}, function (result, status) {
						//console.log(status)//"timeout"
					});
				}
			}
		},
		mounted: function mounted() {
			var that = this;
			bui.ajax({
				url: apiUrl + "/mapi/common/bankConfig",
				data: {},
				beforeSend: denglu,
				method: "post"
			}).then(function (result) {
				if (result.code == 0) {
					for (var i in result.data.bank) {
						arrbank.push({ name: result.data.bank[i], vaule: i });
					}
					console.log(arrbank);
					that.formboxs.arrbank = arrbank;
				}
			}, function (result, status) {
				//console.log(status)//"timeout"
			});

			$(".yzma").click(function () {
				if (clicktel) {
					clicktel = false;
					bui.ajax({
						url: apiUrl + "/mapi/common/sendCode",
						beforeSend: denglu,
						data: {
							mobile: that.formboxs.banktel,
							service_id: 1
						},
						method: "post"
					}).then(function (result) {
						if (result.code == 0) {
							ii = setInterval(function () {
								timer();
							}, 1000);
						} else {
							bui.alert(result.msg);
						}
					}, function (result, status) {
						//console.log(status)//"timeout"
					});
				}
				/**/

				var h, m, s, hstr, mstr, sstr, timestr, ii;
				var etime = 60;
				function timer() {
					h = Math.floor(etime / 3600); //时
					m = Math.floor(etime / 60) % 60; //分
					s = Math.floor(etime % 60); //秒

					h = Math.max(0, h);
					m = Math.max(0, m);
					s = Math.max(0, s);

					h.toString().length < 2 ? hstr = "0" + h.toString() : hstr = h; //1显示01
					m.toString().length < 2 ? mstr = "0" + m.toString() : mstr = m; //1显示01
					s.toString().length < 2 ? sstr = "0" + s.toString() : sstr = s; //1显示01

					if (sstr == '00') sstr = 60;
					timestr = /*hstr + ":"+ mstr + "分" + */sstr + "秒";
					etime = etime - 1;
					if (etime > 0) {
						$('#send').text(timestr);
					} else {
						clearInterval(ii);
						$('#send').text('获取验证码');
						//bind.codeRequesting = 0;
						clicktel = true;
						return false;
					}
				}
			});
			$(".selects").change(function () {
				$(this).css("color", "#666");
			});
		}
	});
});