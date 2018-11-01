'use strict';

loader.define(function (require, exports, module) {
	var islogin = tokenstorage.get("tokens");
	var denglu = function denglu(xhr) {
		xhr.setRequestHeader('token', islogin);xhr.setRequestHeader('clientid', 'testclient');
	};
	var clicktel = true;
	var setpw = new Vue({
		el: "#setpw",
		data: {
			tel: "",
			yzmun: "",
			newpassword: "",
			newpassword1: ""
		},
		methods: {
			editpassword: function editpassword() {
				var that = this;
				if (that.newpassword != that.newpassword1) {
					bui.alert("两次密码不一致");
					return false;
				}
				bui.ajax({
					url: apiUrl + "/mapi/user/pwdModify",
					data: {
						pwd: that.newpassword,
						captcha: that.yzmun
					},
					beforeSend: denglu,
					method: "post"
				}).then(function (result) {
					if (result.code == 0) {
						bui.alert("修改成功,请重新登录", function () {
							tokenstorage.remove("tokens");
							window.location.href = domains;
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
			var that = this;
			$(".yzma").click(function () {
				if (clicktel) {
					clicktel = false;
					bui.ajax({
						url: apiUrl + "/mapi/common/sendCode",
						beforeSend: denglu,
						data: {
							mobile: that.tel,
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
				var etime = 10;
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
		}
	});
});