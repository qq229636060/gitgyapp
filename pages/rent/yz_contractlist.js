loader.define(function (require, exports, module){
    var zuyuetype = [];
    var htstyle = [];
    var htobject = [];
    var houselists = [];
    var leaseStatus_num = "";
    var params = router.getPageParams();
    var rentid = params.rent_id;
    var islogin = tokenstorage.get("tokens");
    var uiListcontract;
    var denglu = function(xhr){xhr.setRequestHeader('token',islogin);xhr.setRequestHeader('clientid','testclient')};
    var databox = {
            trader: [],
            leaseStatus: [],
            leaseType: [],
            clist: [],
            show: 5,
            now: '-1',
            now1: '-1',
            now2: '-1',
            btnshow:'',
            iconface:0,
            types:"",
    };
    var contractlist = new Vue({
        el: "#zuyuelistapp",
        data: databox,
        methods: {
                hover_info:function(e,htid,returntype,rent_id){
                    router.load({url:"pages/rent/yz_contractinfo.html", param: {id:e,htid:htid,returntype:returntype,rent_id:rentid,type:databox.types}});
                },
                gotoyzadd:function(){
                     if(power_rent_owner_add == 1){
                        bui.alert("你没有权限录入");
                        return false;
                     }
                     bui.load({
                            url: "pages/rent/yz_addcontract.html",
                            param: {
                                rent_id: rentid,
                                htid: 0
                            }
                        });
                }
        },
        mounted: function(){
            getdatas();
        }
    })
  

     function getdatas() {
            //var that = this;
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
                        mode:2,
                       //status:leaseStatus_num,
                        rent_id:rentid
                    },
                    refresh:false,
                    //如果分页的字段名不一样,通过field重新定义
                    field: {
                        page: "page",
                        data: "data.list"
                    },
                    onLoad: function (scroll,data) {
                           if(data.code == 0){
                             databox.types = 2;
                             for(var i=0; i<data.data.list.length;i++){
                                databox.clist.push(data.data.list[i])
                             }
                           }else if(data.code == '-86'){
                                bui.alert(data.msg,function(){
                                    bui.back();
                                });
                           }
                    },
                    callback: function (e) {
                            // 点击整行的时候执行
                    }
                })

            
    }
     return {
      pageName: "contractlist",
      pageview: contractlist
    }
})