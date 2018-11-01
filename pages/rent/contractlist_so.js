loader.define(function (require, exports, module){
    var zuyuetype = [];
    var htstyle = [];
    var htobject = [];
    var houselists = [];
    var leaseStatus_num = "";
    var trader_num = router.getPageParams().typsz;
    var islogin = tokenstorage.get("tokens");
    var status = router.getPageParams().status;
    var uiListcontract;
    var denglu = function(xhr){xhr.setRequestHeader('token',islogin);xhr.setRequestHeader('clientid','testclient')};
    var databox = {
            trader: [],
            leaseStatus: [],
            leaseType: [],
            clist: [],
            btnshow:'',
            iconface:0,
            types:"",
            h5txt:""
    };
    var contractlistso = new Vue({
        el: "#zuyuelistappso",
        data: databox,
        methods: {
                hover_info:function(e,htid,returntype,rent_id){
                  if(trader_num == 0){
                       router.load({ url:"pages/rent/contractinfo.html", param: {id:e,htid:htid,returntype:returntype,rentid:rent_id,type:databox.types}}); 
                   }else{
                    router.load({ url:"pages/rent/yz_contractinfo.html", param: {htid:htid,rent_id:rent_id}}); 
                   }
                },

        },
        mounted: function(){
            getdatas();
        }
    })
     function getdatas() {
               var uiSearchbar = bui.searchbar({
                 id: "#searchbar",
                 callback: function(ui, keyword) {
                    $("#scrollso .bui-list").empty();
                      uiListcontract && uiListcontract.destroy();
              if(trader_num == 0){
                    databox.h5txt = "租客";
                    if(status == 1){
                        leaseStatus_num = 2;
                        status ="";
                    }else if(status == 2){
                         leaseStatus_num = 3;
                         status ="";
                    }
                    databox.iconface = 0;
                    databox.clist =[];
                    uiListcontract = bui.list({
                    id: "#scrollcontract",
                    url: apiUrl + "/mapi/tenant/lease",
                    method: "post",
                    headers: {
                        clientid: "testclient",
                        token: islogin
                    },
                    page: 1,
                    pageSize:15,
                    data:{
                        mode:mode,
                        kw:keyword
                    },
                    refresh:false,
                    //如果分页的字段名不一样,通过field重新定义
                    field: {
                        page: "page",
                        data: "data.list"
                    },
                    onLoad: function (scroll,data) {
                           if(data.code == 0){
                              databox.types = 0;
                              for(var i=0; i<data.data.list.length;i++){
                                databox.clist.push(data.data.list[i])
                             }
                           }else{
                            bui.alert(data.msg,function(e){
                                tokenstorage.remove("tokens");
                                window.location.href = domains;
                            }); 
                           } 
                    },
                    callback: function (e) {
                            // 点击整行的时候执行
                    }
                })
            }else{
                     databox.h5txt = "业主";
                    databox.iconface = 1;
                    databox.clist =[];
                    uiListcontract = bui.list({
                    id: "#scrollcontract",
                    url: apiUrl + "/mapi/owner/lease",
                    method: "post",
                    headers: {
                        clientid: "testclient",
                        token: islogin
                    },
                    page: 1,
                    pageSize:15,
                    data:{
                        mode:mode,
                        kw:keyword
                    },
                    refresh:false,
                    //如果分页的字段名不一样,通过field重新定义
                    field: {
                        page: "page",
                        data: "data.list"
                    },
                    onLoad: function (scroll,data) {
                           if(data.code == 0){
                             console.log(data)
                             databox.types = 1;
                             for(var i=0; i<data.data.list.length;i++){
                                databox.clist.push(data.data.list[i])
                             }
                           }
                    },
                    callback: function (e) {
                            // 点击整行的时候执行
                    }
                })

            }
                 }
               })
    }
     return {
      pageName: "contractlistso",
      pageview: contractlistso
    }
})