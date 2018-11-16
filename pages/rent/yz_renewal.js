loader.define(function(require, exports, module) {
	var arr = [];
	var testmoblie, idcard = false;
	var params = router.getPageParams();
	var rentid = params.rentid;
	var htid = params.htid;
	var otherlist;
	var arrotherlist = [];
	var outherlist = {};
	var mday = [];
	var photo1 = [];
	var photo2 = [];
	var delphoto1 = [];
	var daySelect;
	var left = 3,
		left2 = 10;
	var delimg = [];
	var islogin = tokenstorage.get("tokens");
	var denglu = function(xhr) {
			xhr.setRequestHeader('token', islogin);
			xhr.setRequestHeader('clientid', 'testclient')
		};
	var formbox = new Vue({
		el: "#apps",
		data: {
			pagetitle: "添加合同",
			formboxs: {
				hnames: "",
				hetong: "0",
				name: "",
				tel: "",
				Id: "",
				times: "",
				timee: "",
				payfunction: "",
				rentstype: "",
				rentsday: "",
				zujin: "",
				yajin: "",
				idpic: "",
				others: [],
			},
			shouzuri: "",
			shouzuriday: "",
			noedit: true,
			paydata: [{
				name: "月付",
				val: "101"
			}, {
				name: "季付",
				val: "102"
			}, {
				name: "半年付",
				val: "103"
			}, {
				name: "年付",
				val: "104"
			}],
			payftxt: "",
			phototxt:"请添加证件照片",
			storep1: [],
			storep2: [],
			uppic1: [],
			uppic2: []
		},
		methods: {
			clickht: function(e) {
				this.formboxs.hetong = e
			},
			telfunction: function() {
				var sMobile = this.formboxs.tel
				if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(sMobile))) {
					testmoblie = true;
					return false;
				} else {
					testmoblie = false;
				}
			},
			idcard: function() {
				var IDcard = this.formboxs.Id;
				var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				if (!isIDCard1.test(IDcard)) {
					idcard = true
					//bui.alert("请输入正确身份证号"); 
					return false;
				} else {
					idcard = false
				}
			},
			submit: function(fb) {
				var that = this;
				this.formboxs.rentstype = $("#daySelect .selected-val").eq(0).html();
				this.formboxs.rentsday = $("#daySelect .selected-val").eq(1).html();
				function toObj2(key, val, key1, val1, key2, val2) {
					var data = {
						[key]: val,
						[key1]: val1,
						[key2]: val2
					};
					return data;
				}
				$(".other input[type='tel']").each(function(index) {
					var namesval = $(this).attr("name");
					var keyid = $(this).attr("data-id");
					var names = $(this).parent().prev().html();
					outherlist[keyid] = $(this).val();
					that.formboxs.others[index] = toObj2("name", names, "valinput", $(this).val(), "id", keyid);

				})
				that.uppic1 = [];
				$(".zz").each(function(idx) {
					that.uppic1.push($(".zz").eq(idx).attr("bigdata"))
				})
				console.log(that.uppic1)
				that.uppic2 = [];
				$(".zz1").each(function(idx) {
					that.uppic2.push($(".zz1").eq(idx).attr("bigdata"))
				})
				var betime = that.formboxs.times;
				var endtime = that.formboxs.timee;
				var d1 = betime.split('-');
				var d2 = endtime.split('-');
				var sdate = new Date(d1[0], parseInt(d1[1] - 1), d1[2]);
				var edate = new Date(d2[0], parseInt(d2[1] - 1), d2[2]);
				if (testmoblie) {
					bui.alert("请输入正确手机号");
				} else if (that.formboxs.name == "") {
					bui.alert("请输入姓名");
				} else if (sdate > edate) {
					bui.alert("开始时间不能大于结束时间");
				} else if (that.formboxs.payfunction == "") {
					bui.alert("请选择支付方式");
				} else if (that.formboxs.zujin == "") {
					bui.alert("请填写房屋租金");
				} else if (that.formboxs.rentstype == "请选择") {
					bui.alert("请选择收租日");
				} else if (that.formboxs.yajin == "") {
					bui.alert("请填写房屋押金");
				} else {
					var img1 = bui.storage();
					var img2 = bui.storage();
					var delimg1 = bui.storage();
					photo1 = img1.get("pics");
					photo2 = img2.get("pics1");
					delphoto1 = delimg1.get("delpics");
					if (fb == 1) {
						if (that.formboxs.rentstype == "提前日收租") {
							var moneyday = 1;
						} else {
							var moneyday = 2;
						}
						var reg = new RegExp("天");
						var tqdays = that.formboxs.rentsday.replace(reg, "");
						bui.ajax({
							url: apiUrl + "/mapi/owner/renewSave",
							data: {
								rent_id:rentid,
								id: htid,
								name: that.formboxs.name,
								mobile: that.formboxs.tel,
								credentials: that.formboxs.Id,
								end_time: that.formboxs.timee,
								rent: that.formboxs.zujin,
								deposit: that.formboxs.yajin,
								payment: that.formboxs.payfunction,
								collect_way: moneyday,
								collect_day: tqdays,
								other: outherlist,
								img1: that.uppic1,
								img2: that.uppic2,
								del_img: delimg,
								remarks:that.formboxs.beizhu
							},
							method: "POST",
							dataType: "json",
							beforeSend: denglu,
						}).then(function(result) {
							// 成功
							if(result.code == 0){
								 bui.hint({
							 	content: "<i class='icon-check'></i><br />续租成功",
							 	position: "center",
							 	effect: "fadeInDown",
							 	onClose: function() {
							 		router.back({
							 			callback: function(mod) {
							 				mod.pageview.$options.mounted[0]()
							 			}
							 		})
							 	}
							 });
							}else{
								bui.alert(result.msg);
							}
							console.log(result);
							
						}, function(result, status) {
							//console.log(status)//"timeout"
						});
					} else {
						var storage = bui.storage()
						storage.set("formboxs", this.formboxs);
						var data = storage.get("j");
						router.load({
							url: "pages/rent/preview.html"
						});
					}
				}
			}
		},
		created() {　　　　　　　　　　　　 //如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
			this.formboxs.payfunction = this.paydata[0].val;
		},
		mounted: function() {
			var that = this;
			bui.ajax({
				url: apiUrl + "/mapi/owner/info",
				data: {
					rent_id:rentid,
					id: htid
				},
				//接口请求的参数
				// 可选参数
				method: "POST",
				dataType: "json",
				beforeSend: denglu,
			}).then(function(result) {
				 that.formboxs.hnames = result.data.rent.title;
				//其他选项
				otherlist = result.data.config.sundryCollect;
				for (var i in otherlist) {
					arrotherlist.push({
						"name": otherlist[i],
						"value": i
					});
				}
				//编辑数据
				if (htid != 0) {
					that.pagetitle = "编辑合同";
					that.formboxs.name = result.data.owner.name;
					that.formboxs.tel = result.data.owner.mobile;
					that.formboxs.Id = result.data.owner.credentials;
					
					function getNextDate(date,day) {  
						  var dd = new Date(date);
						  dd.setDate(dd.getDate() + day);
						  var y = dd.getFullYear();
						  var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
						  var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
						  return y + "-" + m + "-" + d;
						};
					that.formboxs.timee = getNextDate(result.data.owner.end_time,1);
					that.formboxs.times = getNextDate(result.data.owner.end_time,1);
					that.formboxs.zujin = result.data.owner.rent;
					that.formboxs.yajin = result.data.owner.deposit;
					that.shouzuri = result.data.owner.collect_way;
					that.shouzuriday = result.data.owner.collect_day;
					that.storep1 = result.data.photos[1] == undefined ? result.data.photos[1] = [] : result.data.photos[1];
					that.storep2 = result.data.photos[2] == undefined ? result.data.photos[2] = [] : result.data.photos[2];
					mday[0] = String(parseInt(result.data.owner.collect_way.id) - 1);
					mday[1] = String(parseInt(result.data.owner.collect_day) - 1); /*收租日*/
					loader.import("../js/mock/addcontract.json", function() {
						daySelect = bui.levelselect({
							data: days,
							title: "选择时间",
							trigger: ".selected-val",
							value: [mday[0], mday[1]],
							level: 2,
							field: {
								name: "lever1",
								data: ["lever2"]
							}
						})
					})
					var k;
					if (result.data.owner.payment.id == 101) {
						k = 0;
					} else if (result.data.owner.payment.id == 102) {
						k = 1;
					} else if (result.data.owner.payment.id == 103) {
						k = 2;
					} else if (result.data.owner.payment.id == 104) {
						k = 3;
					}
					that.formboxs.payfunction = that.paydata[k].val;
					if (result.data.noEdit == 1) {
						that.noedit = false;
						if (that.formboxs.payfunction == 101) {
							that.payftxt = "月付";
						} else if (that.formboxs.payfunction == 102) {
							that.payftxt = "季付";
						} else if (that.formboxs.payfunction == 103) {
							that.payftxt = "半年付";
						} else if (that.formboxs.payfunction == 104) {
							that.payftxt = "年付";
						}
						var yother = result.data.owner.others;
						for (var i = 0; i < yother.length; i++) {
							var boxs = '<div class="addbox"><div class="othername">' + yother[i].name + '</div><div class="inputmoney"><input type="tel" value="' + yother[i].value + '" name="other' + yother[i].id + '" data-id="' + yother[i].id + '" disabled="disabled"/><i>元</i></div></div>'
							arr[yother[i].id] = yother[i].id;
							$(".other").append(boxs)
						}
					} else {
						that.noedit = true;
						var yother = result.data.owner.others;
						for (var i = 0; i < yother.length; i++) {
							var boxs = '<div class="addbox"><div class="othername">' + yother[i].name + '</div><div class="inputmoney"><input type="tel" value="' + yother[i].value + '" name="other' + yother[i].id + '" data-id="' + yother[i].id + '"/><i>元</i><em></em></div></div>'
							arr[yother[i].id] = yother[i].id;
							$(".other").append(boxs)
						}
					}
				} else {
					loader.import("../js/mock/addcontract.json", function() {
						// 普通初始化
						daySelect = bui.levelselect({
							data: days,
							title: "选择时间",
							trigger: ".selected-val",
							level: 2,
							field: {
								name: "lever1",
								data: ["lever2"]
							}
						})
					})
				} /*附件上传*/
				// if (that.storep1.length != 0) {
				// 	left = left - parseInt(that.storep1.length);
				// 	for (var i = 0; i < that.storep1.length; i++) {
				// 		var html = '<div class="file-item thumbnail old zz' + '" picid="' + that.storep1[i].id + '" bigdata="' + that.storep1[i].img + '">' + '<img src="' + that.storep1[i].img + '">' + '<i class="close_photo"></i>' + '</div>';
				// 		$('#fileList').append(html);
				// 	}

				// }
				// if (that.storep2.length != 0) {
				// 	left2 = left2 - parseInt(that.storep2.length);
				// 	for (var i = 0; i < that.storep2.length; i++) {
				// 		var html = '<div class="file-item thumbnail old zz1' + '" picid="' + that.storep2[i].id + '" bigdata="' + that.storep2[i].img + '">' + '<img src="' + that.storep2[i].img + '">' + '<i class="close_photo"></i>' + '</div>';
				// 		$('#fileList1').append(html);
				// 	}

				// }

				var uploader = WebUploader.create({
					auto: true,
					server: apiUrl + "/mapi/upload/img",
					formData: {
						'case': 'owner'
					},
					pick: {
						id: '#filePicker',
						multiple: true
					},
					accept: {
						title: 'Images',
						extensions: 'jpg,jpeg,png',
						mimeTypes: 'image/*'
					},
					threads: 1,
					fileNumLimit: left,
					fileSingleSizeLimit: 6 * 1024 * 1024
				});
				uploader.on('uploadBeforeSend', function(obj, data, headers) {
					headers.token = islogin;
					headers.clientid = 'testclient';
				});
				uploader.on('uploadSuccess', function(file, res) {
					if (left) {
						if (res && 'code' in res && res.code === 0) {
							var html = '<div id="' + file.id + '" class="file-item thumbnail newnew zz" bigdata="' + res.data.url + '">' + '<img src="' + res.data.thumbs['.200x150'] + '">' + '<i class="close_photo"></i>' + '</div>';
							$('#fileList').append(html);
							--left;
						} else {
							uploader.reset();
						}
					}
				});
				uploader.on("error", function(type) {
					var msg = '';
					if (type == "Q_TYPE_DENIED") {
						msg = '请上传jpg,jpeg,png格式的图片!';
					} else if (type == "F_EXCEED_SIZE") {
						msg = '文件大小不能超过6M!';
					} else if (type == "Q_EXCEED_NUM_LIMIT") {
						msg = '最多只能上传' + "3" + '张图片!';
					} else if (type == "F_DUPLICATE") {
						msg = '请不要上传重复图片!';
					}
					if (msg) {
						bui.alert(msg);
					}
				});
				$('#fileList').on('click', '.close_photo', function() {
					var id = $(this).parent().attr('id');
					var picid = $(this).parent().attr('picid');
					if (picid) {
						delimg.push(picid);
					};
					left++;
					$(this).parent().remove();
					$('#upload').show();
					uploader.option('fileNumLimit', left);
					uploader.refresh();
					uploader.reset();
					return false;
				});
				//附件2
				var uploader2 = WebUploader.create({
					auto: true,
					server: apiUrl + "/mapi/upload/img",
					formData: {
						'case': 'owner'
					},
					pick: {
						id: '#filePicker1',
						multiple: true
					},
					accept: {
						title: 'Images',
						extensions: 'jpg,jpeg,png',
						mimeTypes: 'image/*'
					},
					threads: 1,
					fileNumLimit: left2,
					fileSingleSizeLimit: 6 * 1024 * 1024
				});
				uploader2.on('uploadBeforeSend', function(obj, data, headers) {
					headers.token = islogin;
					headers.clientid = 'testclient';
				});
				uploader2.on('uploadSuccess', function(file, res) {
					if (left2) {
						if (res && 'code' in res && res.code === 0) {
							var html = '<div id="' + file.id + '" class="file-item thumbnail newnew2 zz1" bigdata="' + res.data.url + '">' + '<img src="' + res.data.thumbs['.200x150'] + '">' + '<i class="close_photo"></i>' + '</div>';
							$('#fileList1').append(html);
							--left2;
						} else {
							bui.alert(res.msg);
							uploader.reset();
						}
					}
				});
				uploader2.on("error", function(type) {
					var msg = '';
					if (type == "Q_TYPE_DENIED") {
						msg = '请上传jpg,jpeg,png格式的图片!';
					} else if (type == "F_EXCEED_SIZE") {
						msg = '文件大小不能超过6M!';
					} else if (type == "Q_EXCEED_NUM_LIMIT") {
						msg = '最多只能上传' + "10" + '张图片!';
					} else if (type == "F_DUPLICATE") {
						msg = '请不要上传重复图片!';
					}
					if (msg) {
						bui.alert(msg);
					}
				});
				$('#fileList1').on('click', '.close_photo', function() {
					var id = $(this).parent().attr('id');
					var picid = $(this).parent().attr('picid');
					if (picid) {
						delimg.push(picid);
					};
					left2++;
					$(this).parent().remove();
					$('#upload2').show();
					uploader2.option('fileNumLimit', left2);
					uploader2.refresh();
					uploader2.reset();
					return false;
				});
			});
			var inputs = $("#datepicker_input_s");
			var inpute = $("#datepicker_input_e");
			var uiPickerdate_s = bui.pickerdate({
				handle: "#datepicker_input_s",
				// input 显示的日期格式
				formatValue: "yyyy-MM-dd",
				rotateEffect: true,
				cols: {
					hour: "none",
					minute: "none",
					second: "none"
				},
				onChange: function(value) {
					inputs.val(value)
					that.formboxs.times = value
				}
				// 如果不需要按钮,设置为空
				// buttons: null
			});
			var uiPickerdate_e = bui.pickerdate({
				handle: "#datepicker_input_e",
				// input 显示的日期格式
				formatValue: "yyyy-MM-dd",
				rotateEffect: true,
				cols: {
					hour: "none",
					minute: "none",
					second: "none"
				},
				onChange: function(value) {
					inpute.val(value)
					that.formboxs.timee = value
				}
				// 如果不需要按钮,设置为空
				// buttons: null
			});
			$("#daySelect").on("click", function() {
				daySelect.show();
			});
			$("#addotherbtn").on("click", function() {
				var add = bui.select({
					title: "添加费用",
					type: "radio",
					autoClose: true,
					data: arrotherlist,
					height: 300,
					onChange: function(e) {
						$(".bui-mask").hide();
						var othernum = parseInt(add.value());
						if (arr[othernum] == "" || arr[othernum] == undefined) {
							arr[othernum] = othernum;
							var boxs = '<div class="addbox"><div class="othername">' + add.text() + '</div><div class="inputmoney"><input type="tel" name="other' + othernum + '" data-id="' + othernum + '"/><i>元</i><em></em></div></div>'
							$(".other").append(boxs)
						} else {
							bui.alert("请不要重复勾选")
						}
					}
				});
				add.show();
			})
			$(".other").on("click", "em", function() {
				var dataid = $(this).prev().prev().attr("data-id");
				arr[dataid] = "";
				$(this).parent().parent().remove();
			})
			$(".selects").change(function() {
				$(this).css("color", "#666")
			});


		}
	})
	return {
		idpic: [],
		atter: []
	}
})