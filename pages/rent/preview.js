"use strict";

loader.define(function (require, exports, module) {
	var pics = [];
	var yulan = new Vue({
		el: "#previewapp",
		data: function data() {
			return {
				msg: [],
				idpics: "",
				paytype: '',
				purl: ""
			};
		},

		mounted: function mounted() {
			var storage = bui.storage();
			var datas = storage.get("formboxs");
			this.msg = datas[0];
			if (datas[0].payfunction == "101") {
				this.paytype = "月付";
			} else if (datas[0].payfunction == "102") {
				this.paytype = "季付";
			} else if (datas[0].payfunction == "103") {
				this.paytype = "半年付";
			} else if (datas[0].payfunction == "104") {
				this.paytype = "年付";
			} else {
				this.paytype = "其他";
			};

			if (this.msg.idpic.length != 0) {
				console.log(this.msg.hcpic);
				this.idpics = "查看";
			} else {
				this.idpics = "无";
			}
			$("body").on("click", ".clickyl", function () {
				$(".jdz").show();
			});
			$("body").on("click", ".cphoto", function () {
				$(".jdz").hide();
			});
			this.$nextTick(function () {
				var uiSlide = bui.slide({
					id: "#uiSlide",
					alignClassName: "bui-box-align-middle",
					fullscreen: true,
					zoom: false,
					autopage: true
				});
			});
		}

	});
});