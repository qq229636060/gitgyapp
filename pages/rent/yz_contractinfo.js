loader.define(function(require, exports, module) {
	var params = router.getPageParams();
	var htid = params.htid;
	var rentid = params.rent_id;
	var type = params.type;
	var returntype = params.returntype; //是否退房
	var islogin = tokenstorage.get("tokens");
	var denglu = function(xhr) {
			xhr.setRequestHeader('token', islogin);
			xhr.setRequestHeader('clientid', 'testclient')
		}
	var checked = 1;
	var pics = [];
	var yulan = new Vue({
		el: "#contractioninfo",
		data: {
			roomtitle: "",
			msg: [],
			payf: "",
			//支付方式
			payr: "",
			payday:"",
			//收租日
			idpic: [],
			ok: false,
			tuifan: returntype,
			ownerBillNum:"",
			roomUsed:[]
		},
		methods: {
			gototg:function(){
				bui.load({url:"pages/rent/yz_tuoguanck.html",param:{rentid:rentid,use:this.roomUsed,ht_id:htid} });
			},
			lookphoto: function(e) {
				$(".jdz").show();
				var uiSlide = new bui.slide({
					id: "#uiSlide",
					fullscreen: true,
					zoom: false,
					autopage: true
				});
				$(".cphoto").click(function() {
					$(".jdz").hide();
				})
			},
			xzrent: function(e) {
				var that = this;
				if(power_rent_owner_renew == 1){
					bui.alert("你没有权限续租");
					return false;
				}
				if(that.ownerBillNum>0){
					bui.alert("您还有"+that.ownerBillNum+"个应收未收账单未处理");
					return false;
				}
				router.replace({
					url: "pages/rent/yz_renewal.html",
					param: {
						rentid:rentid,
						htid: htid
					}
				})
			},
			tuizu: function(e) {
				var that = this;
				if(power_rent_owner_return == 1){
					bui.alert("你没有权限退租");
					return false;
				}
				if(that.ownerBillNum>0){
				 bui.confirm("您还有"+that.ownerBillNum+"个应收未收账单未处理,是否继续退租?",function(ui){
		           // this 为底部按钮
		           var text = $(this).text();
		           if( text == "确定" ){
		            router.replace({
					url: "pages/rent/yz_refund.html",
					param: {
						rentid:rentid,
						htid: htid
					}
				})
		           }
		         ui.close();
		       });
				} else{
					   router.replace({
					url: "pages/rent/yz_refund.html",
					param: {
						rentid:rentid,
						htid: htid
					}
				})
				}
			}
		},
		mounted: function() {
			var that = this;
			console.log(rentid)
			if (type == 1) {
				bui.ajax({
					url: apiUrl + "/mapi/owner/info",
					data: {
						rent_id:rentid,
						id: htid
					},
					beforeSend: denglu,
					method: "POST"
				}).then(function(result) {
					if (result.code == 0) {
						that.roomUsed = result.data.roomUsed
						that.roomtitle = result.data.rent.title;
						that.ownerBillNum = result.data.ownerBillNum;
						that.msg = result.data.owner;
						if(result.data.owner.collect_way.id=="1"){
							that.payday = '提前' + result.data.owner.collect_day +'天收租'
						}else{
							that.payday = '固定' + result.data.owner.collect_day +'日收租'
						}
						if (result.data.owner.payment.id == 1) {
							that.payf = result.data.owner.month
						} else {
							that.payf = result.data.owner.payment.name;
						}
							if (result.data.photos.length != 0) {
							that.ok = true;
							if (result.data.photos[1] != undefined) {
								console.log(result.data.photos[1])
								for (var i = 0; i < result.data.photos[1].length; i++) {
									pics.push(result.data.photos[1][i]);
								}

							}
							if (result.data.photos[2] != undefined) {
								for (var i = 0; i < result.data.photos[2].length; i++) {
									pics.push(result.data.photos[2][i]);
								}
							}
							that.idpic = pics

						}
					}
				}, function(result, status) {
					//console.log(status)//"timeout"
				});
			} else {
				bui.ajax({
					url: apiUrl + "/mapi/owner/info",
					data: {
						rent_id:rentid,
						id:htid
					},
					method: "POST",
					dataType: "json",
					beforeSend: denglu,
				}).then(function(result) {
					console.log(result)
					if (result.code == 0) {
						that.roomUsed = result.data.roomUsed
						that.roomtitle = result.data.rent.title;
						that.ownerBillNum = result.data.ownerBillNum;
						that.msg = result.data.owner;
						console.log(result.data.owner.collect_way.id)
						if(result.data.owner.collect_way.id == "1"){
							that.payday = '提前' + result.data.owner.collect_day +'天收租'
						}else{
							that.payday = '固定' + result.data.owner.collect_day +'日收租'
						}
						if (result.data.owner.payment.id == 1) {
							that.payf = result.data.owner.month
						} else {
							that.payf = result.data.owner.payment.name;
						}
						if (result.data.photos.length != 0) {
							that.ok = true;
							if (result.data.photos[1] != undefined) {
								console.log(result.data.photos[1])
								for (var i = 0; i < result.data.photos[1].length; i++) {
									pics.push(result.data.photos[1][i]);
								}

							}
							if (result.data.photos[2] != undefined) {
								for (var i = 0; i < result.data.photos[2].length; i++) {
									pics.push(result.data.photos[2][i]);
								}
							}
							that.idpic = pics

						}

					} else {
						bui.alert(result.msg);
					}

				}, function(result, status) {
					//console.log(status)//"timeout"
				});
			}
			$("body").on("click", ".fxk", function() {
				if ($(".fxk").html() == "") {
					$(".fxk").html("√");
				} else {
					$(".fxk").html("");
				}
			})
			//编辑按钮
			var btnarr = [{
				name: "编辑合同",
				value: "0"
			},{
				name: "删除合同",
				value: "1"
			},
			{
				name: "添加账单",
				value: "2"
			},
			{
				name: "查看账单",
				value: "3"
			}
			];
			if (returntype == 4) {
				var btnarr = [{
					name: "删除合同",
					value: "1"
				}];
			}
			var editcontract = bui.actionsheet({
				trigger: "#roombtnopen",
				position: "bottom",
				buttons: btnarr,
				callback: function(e, ui) {
					var val = $(this).attr("value");
					if (val == "cancel") {
						editcontract.hide();
					} else if (val == "0") {
						editcontract.hide();
						if(power_rent_owner_edit == 1){
							bui.alert("你没有权限编辑");
							return false;
						}
						router.replace({
							url: "pages/rent/yz_addcontract.html",
							param: {
								rent_id: rentid,
								htid: htid
							}
						})
					} else if (val == "1") {
						editcontract.hide();
						if(power_rent_owner_del == 1){
							bui.alert("你没有权限删除");
							return false;
						}
						bui.confirm({
							"title": "",
							"content": '<div class="bui-box-center"><p>是否删除合同</p><p><em class="fxk">√</em>同时删除已确认账单和流水</p></div>',
							"buttons": [{
								name: "确定",
								className: "primary-reverse"
							}, {
								name: "取消",
								className: "primary-reverse"
							}]
						}, function(e) {
							if ($(this).text() == "确定") {
								if ($(".fxk").html() == "") {
									checked = ""
								}
								bui.ajax({
									url: apiUrl + "/mapi/owner/del",
									data: {
										rent_id: rentid,
										id: htid,
										checked: checked
									},
									beforeSend: denglu,
									method: "POST"
								}).then(function(result) {
									bui.confirm({
										"title": "",
										"content": '<div class="bui-box-center"><h3><i class="icon-success"></i></h3><p>删除成功</p></div>',
										"buttons": [{
											name: "确定",
											className: "primary-reverse"
										}]
									}, function() {
										router.back({
											callback: function(mod) {
												mod.pageview.$options.mounted[0]()
											}
										})
									});

								}, function(result, status) {
									//console.log(status)//"timeout"
								});
							}
						});
					}else if(val == "2"){
						editcontract.hide();
						if(power_rent_owner_bill_add == 1){
							bui.alert("你没有权限添加");
							return false;
						}
						bui.load({url:"pages/finance/addzd",param:{ifadd:0,names:that.msg.name,ownerid:that.msg.id,cate:2}});
					}else if(val == "3"){
						editcontract.hide();
						if(power_rent_owner_bill_info == 1){
							bui.alert("你没有权限查看");
							return false;
						}
						router.load({ url:"pages/finance/zhangdan.html", param: {owner_id:that.msg.id,mode:mode,trader:2} });
					}
				}
			})
		}

	})

})