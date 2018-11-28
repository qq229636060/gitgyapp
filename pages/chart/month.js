loader.define(function(require, exports, module) {
	var islogin = tokenstorage.get("tokens");
	var denglu = function(xhr) {xhr.setRequestHeader('token', islogin);xhr.setRequestHeader('clientid', 'testclient')};
	var thatz;
	var monthdatas ={
		mdata:"",
		monthtime:"",
		mcaiwudata:"",
		st:"",
		st1:"",
		power_if1:"",
		power_if:""
	};
	var myDate = new Date();
		 	 var year=myDate.getFullYear();
		 	 var month=myDate.getMonth()+1;
		 	 if(month == 1){
		 	 	var newmonth = 12
		 	 }else{
		 	 	if(month<=10){
		 	 		var newmonth = "0" + (month-1);
		 	 	}else{
		 	 		var newmonth = month-1;
		 	 	}
		 	 };
	function getmonth(thisz){
		 thisz.$nextTick(function(){ 
		 	if(power_report_operate_month != 1){
		 	 monthdatas.monthtime = uitime.value();
		 	 //月运营
		 	 bui.ajax({
		     url: apiUrl + "/mapi/report/operateMonth",
		     data: {
		     	mode:mode,
		     	time:monthdatas.monthtime
		     },
		     beforeSend: denglu,
		     method: "post"
		 }).then(function(result){
		     if(result.code == 0){
		     	console.log(result);
		     	monthdatas.st = result.data.st;
		     	monthdatas.mdata = result.data.list;
		     	var myChart = echarts.init(document.getElementById('tubiao'));
		     	var myChart2 = echarts.init(document.getElementById('tubiao2'));
		     	var option = {
					    title: {
					        text: '出租情况'
					    },
					    tooltip: {
					        trigger: 'axis'
					    },
					    grid: {
					        containLabel: true
					    },
					    xAxis: {
					        type: 'category',
					        boundaryGap: false,
					        data: result.data.dat.key
					    },
					    yAxis: {
					        type: 'value'
					    },
					    series: [
					        {
					            name:'新增房间数',
					            type:'line',
					            stack: '总量',
					            data:result.data.dat.dat1
					        },
					        {
					            name:'在租房间数',
					            type:'line',
					            stack: '总量',
					            data:result.data.dat.dat2
					        },
					        {
					            name:'空置房间数',
					            type:'line',
					            stack: '总量',
					            data:result.data.dat.dat3
					        }
					        
					    ]
					};
					var option2 = {
					    title: {
					        text: '续租情况'
					    },
					    tooltip: {
					        trigger: 'axis'
					    },
					    grid: {
					        containLabel: true
					    },
					    xAxis: {
					        type: 'category',
					        boundaryGap: false,
					        data: result.data.dat.key
					    },
					    yAxis: {
					        type: 'value'
					    },
					    series: [
					        {
					            name:'新租房间',
					            type:'line',
					            stack: '总量',
					            data:result.data.dat.dat4
					        },
					        {
					            name:'续租房间',
					            type:'line',
					            stack: '总量',
					            data:result.data.dat.dat5
					        }
					        
					    ]
					};
					  myChart.setOption(option, true);
					  myChart2.setOption(option2, true);
		     }else{
		     	bui.alert(result.msg);
		     }
		 },function(result,status){
		     //console.log(status)//"timeout"
		 });
		 }else{
		 	
		 }
		 //月财务
		 if(power_report_finance_month != 1){
		 bui.ajax({
		     url: apiUrl + "/mapi/report/financeMonth",
		      data: {
		     	mode:mode,
		     	time:monthdatas.monthtime
		     },
		     beforeSend: denglu,
		     method: "post"
		 }).then(function(result){
		     if(result.code==0){
		     	monthdatas.st1 = result.data.st;
		     	monthdatas.mcaiwudata = result.data.list
		     }else{
		     	bui.alert(result.msg);
		     }
		 },function(result,status){
		     //console.log(status)//"timeout"
		 });
		 }else{
		 	monthdatas.power_if1 == 0
		 }
		})
	
	}
	var monthchart = new Vue({
		el:"#month",
		data:monthdatas,
		methods:{},
		mounted:function(){
			thatz = this
			getmonth(thatz)
		}
	})  	
	var inputs = $("#xztime");
	var uitime = bui.pickerdate({
				handle: "#xztime",
				// input 显示的日期格式
				formatValue: "yyyy-MM",
				rotateEffect: true,
				value:year+'-'+newmonth,
				max:year+'-'+newmonth,
				cols: {
					hour: "none",
					minute: "none",
					second: "none",
					date:"none"
				},
				onChange: function(value) {
					inputs.val(value)
					monthdatas.monthtime = value;
				},
				callback:function(value){
					inputs.val(value);
					monthdatas.monthtime =inputs.val(value);
					getmonth(thatz);
				}
			});
	  var uiActionsheet = bui.actionsheet({
           trigger: "#editday",
           buttons: [{ name:"月报表",value:"1" },{ name:"日报表",value:"2" }],
           callback: function (e,ui) {
               var val = $(this).attr("value");
               if( val == "cancel" || val == "1"){
                   ui.hide();
               }
               if(val == "2"){
               	ui.hide();
               	if(power_report_operate_day == 1 && power_report_finance_day == 1){
               		bui.alert("你没有权限查看");
               		return false
               	}
               	 router.replace({url:"pages/chart/days.html",param:{} });
               }
           }
       });
       var uiSlideTab = bui.slide({
				id:"#uiSlideTab",
				menu:".bui-nav",
				children:".bui-tab-main > ul",
				scroll: true
		})	
       uitime.on("show",function(){
	  	uiActionsheet.hide()
	  	$("#editday").hide()
	  })
	  uitime.on("hide",function(){
	  	uiActionsheet.hide()
	  	$("#editday").show()
	  })
})