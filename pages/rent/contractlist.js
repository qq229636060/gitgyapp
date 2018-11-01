loader.define(function (require, exports, module){
    var zuyuetype = [];
    var htstyle = [];
    var htobject = [];
    var houselists = [];
    var leaseStatus_num = "";
    var trader_num = 0;
    var islogin = tokenstorage.get("tokens");
    var status = router.getPageParams().status;
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
            namesz:""
    };
    var contractlist = new Vue({
        el: "#zuyuelistapp",
        data: databox,
        methods: {
               navs: function (indexs) {
            	    if(this.show < 4){
            	    	this.show = 5
            	    }else{
            	    this.show = indexs
            	    }
                    
                },
                hover_info:function(e,htid,returntype,rent_id){
                    if(trader_num == 0){
                       router.load({ url:"pages/rent/contractinfo.html", param: {id:e,htid:htid,returntype:returntype,rentid:rent_id,type:databox.types}}); 
                   }else{
                       router.load({ url:"pages/rent/yz_contractinfo.html", param: {htid:htid,rent_id:rent_id}}); 
                   }
                    
                },
                gotososo:function(){
                     router.load({ url:"pages/rent/contractlist_so.html", param: {typsz:trader_num}});
                },
                overselcet: function (indexs, text, now) {
                    $(".k" + indexs).html(text)
                    this.show = 5;
                    if (indexs == '1') {
                        this.now = now;
                        trader_num = now;
                    } else if (indexs == '2') {
                        this.now1 = now;
                        leaseStatus_num = now+1;
                    } else {
                        this.now2 = now;
                    }
                    getdatas();
                }

        },
        mounted:function(){
            getdatas();
        }
    })
    /*条件*/
           bui.ajax({
                url: apiUrl + "/mapi/common/leaseConfig",
                  beforeSend:denglu,
                  method: "post",
                  data: {}
            }).then(function (res) {
                console.log(res)
                $.each(res.data.leaseStatus,function(index){
                    zuyuetype.push(res.data.leaseStatus[index])
                })
                $.each(res.data.leaseType,function(index){
                    htstyle.push(res.data.leaseType[index])
                })
                $.each(res.data.trader,function(index){
                    htobject.push(res.data.trader[index])
                })
                
                 databox.leaseStatus = zuyuetype;
                 databox.leaseType = htstyle;
                 databox.trader = htobject;
            }, function (res, status) {
                alert(status)
            })

     function getdatas() {
            //var that = this;
              uiListcontract && uiListcontract.destroy();
              if(trader_num == 0){
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
                    id: "#scrollcontractzzz",
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
                        status:leaseStatus_num
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
                              databox.namesz = "租客";
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
                        status:leaseStatus_num
                    },
                    refresh:false,
                    //如果分页的字段名不一样,通过field重新定义
                    field: {
                        page: "page",
                        data: "data.list"
                    },
                    onLoad: function (scroll,data) {
                           if(data.code == 0){
                             databox.types = 1;
                              databox.namesz = "业主";
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
     return {
      pageName: "contractlist",
      pageview: contractlist
    }
})