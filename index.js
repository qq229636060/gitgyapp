var apiUrl = "http://gy.ffw.com.cn";
var tokenstorage = bui.storage();
var domains = 'http://app.gy.ffw.com.cn';
var islogin = tokenstorage.get("tokens");
var denglu = function(xhr){xhr.setRequestHeader('token',islogin);xhr.setRequestHeader('clientid','testclient')}//这里设置header
var returng = 0;
var mode = 1 ;
window.router = bui.router({
           indexModule: {
            moduleName: "login",
            template: "pages/main/login.html",
            script: "pages/main/login.js"
        }
    });

bui.on("pageinit", function() {
    var needHistory = bui.platform.isIos() && bui.platform.isWeiXin() ? false : true;
    // 初始化路由
    router.init({
        id: "#bui-router",
        progress:true,
        syncHistory: needHistory
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
