loader.define(function(require, exports, module) {
	var params = router.getPageParams();
	var roomid = params.id;
	var htid = params.htid;
	var rentid = params.rentid;
	var uiSlide;
	if(params.type == undefined){
		var type = 0;
	}else{
		var type = params.type;
	}
	var returntype = params.returntype; //是否退房
	var islogin = tokenstorage.get("tokens");
	var denglu = function(xhr) {
			xhr.setRequestHeader('token', islogin);
			xhr.setRequestHeader('clientid', 'testclient')
		}
	var checked = 1;
	var pics = [];
	var datas = {
			roomtitle: "",
			msg:[],
			payf: "",
			payday:"",
			//收租日
			idpic: [],
			ok: false,
			tuifan: returntype,
			tenantBillNum:"",
			compact_type:"",
			compact_status:""
		}
	function getdata_t(){
			if (type == 1) {
				bui.ajax({
					url: apiUrl + "/mapi/owner/info",
					data: {
						rent_id: rentid,
						id: htid
					},
					beforeSend: denglu,
					method: "POST"
				}).then(function(result) {
					if (result.code == 0) {
						datas.roomtitle = result.data.rent.title;
						datas.tenantBillNum = result.data.tenantBillNum; 
						// datas.compact_type = result.data.tenant.compact_type;
						// datas.compact_status = result.data.tenant.compact_status;
						datas.msg = result.data.owner;
						if(result.data.owner.collect_way.id=="1"){
							datas.payday = '提前' + result.data.owner.collect_day +'天收租'
						}else{
							datas.payday = '固定' + result.data.owner.collect_day +'日收租'
						}
						if (result.data.owner.payment.id == 1) {
							datas.payf = result.data.owner.month
						} else {
							datas.payf = result.data.owner.payment.name;
						}
							if (result.data.photos.length != 0) {
							datas.ok = true;
							pics = [];
							if (result.data.photos[1] != undefined) {
								for (var i = 0; i < result.data.photos[1].length; i++) {
									pics.push(result.data.photos[1][i]);
								}

							}
							if (result.data.photos[2] != undefined) {
								for (var i = 0; i < result.data.photos[2].length; i++) {
									pics.push(result.data.photos[2][i]);
								}
							}
							datas.idpic = pics

						}
					}
				}, function(result, status) {
					//console.log(status)//"timeout"
				});
			} else {
				bui.ajax({
					url: apiUrl + "/mapi/tenant/info",
					data: {
						room_id:roomid,
						id: htid
					},
					method: "POST",
					dataType: "json",
					beforeSend: denglu,
				}).then(function(result) {
					if (result.code == 0) {
						datas.roomtitle = result.data.room.title;
						datas.tenantBillNum = result.data.tenantBillNum;
						datas.msg = [];
						datas.msg = result.data.tenant;
						datas.compact_type = result.data.tenant.compact_type;
						datas.payr = result.data.tenant.collect_way.name;
						datas.compact_type = result.data.tenant.compact_type;
						datas.compact_status = result.data.tenant.compact_status;
						if(result.data.tenant.collect_way.id=="1"){
							datas.payday = '提前' + result.data.tenant.collect_day +'天收租'
						}else{
							datas.payday = '固定' + result.data.tenant.collect_day +'日收租'
						}
						if (result.data.tenant.payment.id == 1) {
							datas.payf = result.data.tenant.month
						} else {
							datas.payf = result.data.tenant.payment.name;
						}
						pics = [];
						if (result.data.photos.length != 0) {
							datas.ok = true;
							if (result.data.photos[1] != undefined) {
								for (var i = 0; i < result.data.photos[1].length; i++) {
									pics.push(result.data.photos[1][i]);
								}

							}
							if (result.data.photos[2] != undefined) {
								for (var i = 0; i < result.data.photos[2].length; i++) {
									pics.push(result.data.photos[2][i]);
								}
							}
							datas.idpic = pics

						}

					} else {
						bui.alert(result.msg,function(){
							bui.back();
						});
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
	
			
		}


	var contractinfos = new Vue({
		el: "#contractioninfo",
		data: datas,
		methods: {
			seeht:function(){
				bui.ajax({
				    url: apiUrl + "/mapi/tenant/getPreviewUrl",
				    data: {
				    	tenant_id:htid
				    },
				    beforeSend: denglu,
				    method: "post"
				}).then(function(result){
					if(result.code == 0){
						if(result.data.type == 1){
							bui.load({url:"pages/rent/ifr.html",param:{ifrurl:result.data.previewUrl,types:1}});
						}else{
							bui.load({url:"pages/rent/ifr.html",param:{ifrurl:result.data.previewUrl,types:2} });
						}
					}
				},function(result,status){
				    //console.log(status)//"timeout"
				});
			},
			lookphoto: function(e){
				$(".jdz").show();
				$(".bottombtn").hide();
				this.$nextTick(function (){
					uiSlide && uiSlide.destroy();
					uiSlide = new bui.slide({
					id: "#uiSlide",
					fullscreen: true,
					zoom: false,
					autopage: true
				});
				})
				
				$(".cphoto").click(function() {
					$(".bottombtn").show();
					$(".jdz").hide();
				})
			},
			xzrent: function(e) {
				if(datas.compact_type == 2){
							if(datas.compact_status != 1){
								bui.alert("电子合同待确认不能续租");
								return false
							}
						}
				if(power_rent_tenant_renew == 1){
					bui.alert("你没有权限续租");
					return false;
				}
				if(datas.tenantBillNum > 0){
					bui.alert("您还有"+datas.tenantBillNum+"个应收未收账单未处理");
					return false;
				}
				router.replace({
					url: "pages/rent/renewal.html",
					param: {
						id: roomid,
						htid: htid
					}
				})
			},
			tuizu: function(e) {
				if(datas.compact_type == 2){
							if(datas.compact_status != 1){
								bui.alert("电子合同待确认不能退租");
								return false
							}
						}
				if(power_rent_tenant_return == 1){
					bui.alert("你没有权限退租");
					return false;
				}
				if(datas.tenantBillNum > 0){
					bui.confirm("您还有"+datas.tenantBillNum+"个应收未收账单未处理,是否继续退租?",function(ui){
					    // this 为底部按钮
					    var text = $(this).text();
					    if( text == "确定" ){
					    		router.replace({
					url: "pages/rent/refund.html",
					param: {
						id: roomid,
						htid: htid
					}
				})
					    }
						ui.close();
					});
				}else{
					router.replace({
					url: "pages/rent/refund.html",
					param: {
						id: roomid,
						htid: htid
					}
				})
				}
			
			}
		},
		mounted: function(){
			getdata_t()
		}

	})
				//编辑按钮
			var btnarr = [{
				name: "编辑合同",
				value: "0"
			}, {
				name: "删除合同",
				value: "1"
			},{
				name: "添加账单",
				value: "2"
			},{
				name: "查看账单",
				value: "3"
			}];
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
						if(datas.compact_type == 2){
							if(datas.compact_status == 1){
								bui.alert("电子合同已确认,不能编辑");
								return false
							}
						}
						if(power_rent_tenant_edit == 1){
							bui.alert("你没有权限编辑");
							return false
						}
						bui.load({
							url: "pages/rent/addcontract.html",
							param: {
								id: roomid,
								htid: htid
							}
						})
					} else if (val == "1") {
						editcontract.hide();
						if(power_rent_tenant_del == 1){
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
									url: apiUrl + "/mapi/tenant/del",
									data: {
										room_id: roomid,
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
						if(power_rent_tenant_bill_add == 1){
							bui.alert("你没有权限添加");
							return false;
						}
						if(type == 0){
							var cate = 1
						}else{
							var cate = 2
						}
						bui.load({url:"pages/finance/addzd",param:{ifadd:0,names:datas.msg.name,tenantid:datas.msg.id,cate:cate}});
					}else if(val == "3"){
						editcontract.hide();
						
						if(power_rent_tenant_bill_info == 1){
							bui.alert("你没有权限查看");
							return false;
						}
						router.load({ url:"pages/finance/zhangdan.html", param: {tenantid:datas.msg.id,mode:mode,trader:1} });
					}
				}
			})	
 return{
        pageName:"contractinfo",
        pageview:contractinfos
    }
})