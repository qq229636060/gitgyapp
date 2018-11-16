var apiUrl = "http://gy.ffw.com.cn";
var tokenstorage = bui.storage();
var domains = 'http://app.gy.ffw.com.cn';
var islogin = tokenstorage.get("tokens");
var denglu = function(xhr){xhr.setRequestHeader('token',islogin);xhr.setRequestHeader('clientid','testclient')}//这里设置header
var returng = 0;
var mode = 1 ;
var syncHistory_z;
var power;
var power_rent = 0,
    power_rent_add = 0,
    power_rentinfo = 0,
    power_rent_bill = 0,
    power_rent_tenant_bill_info = 0,
    power_rent_owner_bill_info =0,
    power_rent_owner_bill_del = 0,
    power_rent_owner_bill_edit =0,
    power_rent_tenant_bill_del = 0,
    power_rent_tenant_bill_edit = 0,
    power_rent_owner_bill_confirm = 0,
    power_rent_tenant_bill_confirm = 0,
    power_finance_flow_detail = 0,
    power_rent_room_edit = 0,
    power_rent_owner_info = 0,
    power_rent_tenant_info = 0,
    power_rent_room_del = 0,
    power_rent_tenant_edit = 0,
    power_rent_tenant_del = 0,
    power_rent_tenant_bill_add = 0,
    power_rent_tenant_renew = 0,
    power_rent_tenant_return = 0,
    power_rent_owner_edit = 0,
    power_rent_owner_del = 0,
    power_rent_owner_bill_add = 0,
    power_rent_owner_renew = 0,
    power_rent_owner_return = 0,
    power_rent_list = 0,
    power_rent_list_down = 0,
    power_rent_list_refresh = 0,
    power_report_finance = 0,
    power_report_operate =0,
    power_report_operate_day = 0,
    power_report_operate_month = 0,
    power_report_finance_day = 0,
    power_report_finance_month = 0,
    power_rent_tenant_add = 0,
    power_rent_room_info = 0,
    power_rent_edit = 0,
    power_rent_del = 0,
    power_rent_room_add = 0,
    power_rent_owner_add = 0
window.router = bui.router({
           indexModule: {
            moduleName: "login",
            template: "pages/main/login.html",
            script: "pages/main/login.js"
        }
    });

bui.on("pageinit", function() {
    //var needHistory = bui.platform.isIos() && bui.platform.isWeiXin() ? false : true;微信底部
    var bool = bui.platform.isIos();
    if(bool){
      syncHistory_z = false;
    }else{
      syncHistory_z = true;
    }
    // 初始化路由
    router.init({
        id: "#bui-router",
        progress:true,
        syncHistory: syncHistory_z
    })
    // 绑定事件
    bind();
    function bind() {
        // 绑定页面的所有按钮有href跳转
        bui.btn({
            id: "#bui-router",
            handle: ".bui-btn,a"
        }).load();
        // 统一绑定页面所有的后退按钮
        $("#bui-router").on("click", ".btn-back", function(e) {
            // 支持后退多层,支持回调
            bui.back({
                callback: function(mod) {
                    console.log(mod)
                    // mod为后退以后页面抛出来的模块. 你可以自定义你的局部方法处理.
                    mod.init()
                }
            });

        })
    }
})

//权限
function powerz(son){
  if(son == 0){
    return true;
  }else{
    if(!bui.array.compare("rent", power.powers)){
      power_rent = 1
    }//租务管理
    if(!bui.array.compare("rent_add", power.powers)){
      power_rent_add = 1
    }// 添加公寓
    if(!bui.array.compare("rent_owner_info", power.powers)){
          power_rent_owner_info = 1
     } 
     if(!bui.array.compare("rent_tenant_info", power.powers)){
          power_rent_tenant_info = 1
     }
      //租客合同业主合同
    if(!bui.array.compare("rent_tenant_bill_info", power.powers)){
          power_rent_tenant_bill_info = 1;
    }
    if(!bui.array.compare("rent_owner_bill_info", power.powers)){
          power_rent_owner_bill_info = 1;
    }
    //账单
    if(!bui.array.compare("rent_owner_bill_del", power.powers)){
        power_rent_owner_bill_del = 1;
    }//删除账单业主
     if(!bui.array.compare("rent_owner_bill_edit", power.powers)){
        power_rent_owner_bill_edit = 1;
    }//编辑账单业主
    if(!bui.array.compare("rent_tenant_del", power.powers)){
        power_rent_tenant_bill_del = 1;
    }//删除账单租客
     if(!bui.array.compare("rent_tenant_bill_edit", power.powers)){
        power_rent_tenant_bill_edit = 1;
    }//编辑账单租客
    if(!bui.array.compare("rent_tenant_bill_confirm", power.powers)){
        power_rent_tenant_bill_confirm = 1;
    }//确认交租租客
    if(!bui.array.compare("rent_owner_bill_confirm", power.powers)){
        power_rent_owner_bill_confirm = 1;
    }//确认交租业主
    if(!bui.array.compare("finance_flow_detail", power.powers)){
        power_finance_flow_detail = 1;
    }//流水
    if(!bui.array.compare("rent_room_edit", power.powers)){
        power_rent_room_edit = 1;
    }//编辑房间 
    if(!bui.array.compare("rent_room_del", power.powers)){
        power_rent_room_del = 1;
    }//删除房间
    if(!bui.array.compare("rent_tenant_edit", power.powers)){
        power_rent_tenant_edit = 1;
    }//编辑租客合同
    if(!bui.array.compare("rent_tenant_del", power.powers)){
        power_rent_tenant_del = 1;
    }//删除租客合同
    if(!bui.array.compare("rent_tenant_bill_add", power.powers)){
        power_rent_tenant_bill_add = 1;
    }//租客添加账单
    if(!bui.array.compare("rent_tenant_renew", power.powers)){
        power_rent_tenant_renew = 1;
    }//租客续租管理
    if(!bui.array.compare("rent_tenant_return", power.powers)){
        power_rent_tenant_return = 1;
    }//租客退租管理
    if(!bui.array.compare("rent_owner_edit", power.powers)){
        power_rent_owner_edit = 1;
    }//业主编辑合同
    if(!bui.array.compare("rent_owner_del", power.powers)){
        power_rent_owner_del = 1;
    }//业主删除合同
    if(!bui.array.compare("rent_owner_bill_add", power.powers)){
        power_rent_owner_bill_add = 1;
    }//业主添加账单
    if(!bui.array.compare("rent_owner_renew", power.powers)){
        power_rent_owner_renew = 1;
    }//业主续租
    if(!bui.array.compare("rent_owner_return", power.powers)){
        power_rent_owner_return = 1;
    }//业主退租
    if(!bui.array.compare("rent_list", power.powers)){
        power_rent_list = 1;
    }//业主/租客/房源查看
    if(!bui.array.compare("rent_list_down", power.powers)){
        power_rent_list_down = 1;
    }//房源下架
    if(!bui.array.compare("rent_list_refresh", power.powers)){
        power_rent_list_refresh = 1;
    }//房源刷新
     if(!bui.array.compare("report_operate", power.powers)){
        power_report_operate = 1;
    }//运营报表
     if(!bui.array.compare("report_finance", power.powers)){
        power_report_finance = 1;
    }//财务报表
     if(!bui.array.compare("report_finance_day", power.powers)){
        power_report_finance_day = 1;
    }//财务日报表
    if(!bui.array.compare("report_finance_month", power.powers)){
        power_report_finance_month = 1;
    }//财务月报表
    if(!bui.array.compare("report_operate_day", power.powers)){
        power_report_operate_day = 1;
    }//运营日报表
    if(!bui.array.compare("report_operate_month", power.powers)){
        power_report_operate_month = 1;
    }//运营月报表
    if(!bui.array.compare("rent_tenant_add", power.powers)){
        power_rent_tenant_add = 1;
    }//录入租客合同
    if(!bui.array.compare("rent_room_info", power.powers)){
        power_rent_room_info = 1;
    }//查看房间详情
     if(!bui.array.compare("rent_edit", power.powers)){
        power_rent_edit = 1;
    }//编辑房源
     if(!bui.array.compare("rent_del", power.powers)){
        power_rent_del = 1;
    }//删除房源
    if(!bui.array.compare("rent_room_add", power.powers)){
        power_rent_room_add = 1;
    }//添加房间楼层
    if(!bui.array.compare("rent_owner_add", power.powers)){
        power_rent_owner_add = 1;
    }//录入业主合同
    if(power_rent_add == 1){
     $(".fast1").hide()
    } //快捷发布添加房源
    if(power_rent_tenant_add == 1){
     $(".fast2").hide()
    }//快捷发布添加租客合同
    if(power_rent_owner_add== 1){
     $(".fast3").hide()
    }//快捷发布添加业主合同
    if(power_rent_tenant_bill_add == 1){
        $(".fast4").hide()
       }
    //快捷发布添加账单
    if(mode == 1){
      if(power_rent_tenant_bill_confirm == 1){
        $(".fast5").hide()
      }
    }else{
      if(power_rent_tenant_bill_confirm == 1){
        $(".fast5").hide()
      }
    }//确认交租
    if(power_rent_list == 1){
      $(".fast6").hide()
    }
  }
}



$("body").on("click",".footadd",function(){
  $(".moreadd").show();
});
$("body").on("click",".footclosez",function(){
  $(".moreadd").hide();
});
$("body").on("click",".fast1",function(){
   $(".moreadd").hide();
   bui.load({url:"pages/rent/addhouse.html",param:{mode:mode} });
});
$("body").on("click",".fast2",function(){
   $(".moreadd").hide();
   bui.load({url:"pages/fast/fastindex.html",param:{mode:mode} });
});
$("body").on("click",".fast3",function(){
   $(".moreadd").hide();
   bui.load({url:"pages/fast/fastyz.html",param:{mode:mode} });
});
$("body").on("click",".fast4",function(){
   $(".moreadd").hide();
   bui.load({url:"pages/fast/fastzd.html",param:{mode:mode} });
});
$("body").on("click",".fast5",function(){
   $(".moreadd").hide();
   bui.load({url:"pages/fast/fastjiaozu.html",param:{mode:mode} });
});
$("body").on("click",".fast6",function(){
   $(".moreadd").hide();
   if(mode == 1){
    bui.load({url:"pages/release/releaseindex.html",param:{mode:mode} });
  }else{
     bui.load({url:"pages/release/releaseindex2.html",param:{mode:mode} });
  }
  
   
})




$("body").on("click",".gotoindex",function(){
       if (mode == 1) {
         router.replace({
            url: "pages/main/main.html"
         });
      } else if (mode == 2) {
        router.replace({
            url: "pages/main/main2.html"
        });
      }
})
$("body").on("click",".gotohouse",function(){
      if (mode == 1) {
         router.replace({
            url: "pages/rent/houseindex.html"
         });
      } else if (mode == 2) {
        router.replace({
            url: "pages/rent/houseindex2.html"
        });
      }
})
$("body").on("click",".my",function(){
     router.replace({
        url: "pages/my/myindex.html"
     });
})
$("body").on("click",".gotoyuyue",function(){
     router.replace({
        url: "pages/reserve/servelist.html"
     });
})
// $(window).resize(function(){
//   router.init({
//         id: "#bui-router",
//         progress:true,
//         syncHistory: needHistory
//     })
// });
