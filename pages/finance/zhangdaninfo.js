loader.define(function (require, exports, module) {
    var islogin = tokenstorage.get("tokens");
    var params = router.getPageParams();
    var billid = params.id;
    var zt = params.zhuantai;
    var tenantid = params.tenantid;
    var ownerid = params.ownerid;
    var cate =params.cate;
    var moneyarr = [];
    var moredata = [];
    var jdata = {
            housename:"",
            tel:"",
            zkname:"",
            zqtime:"",
            rentTime:"",
            zt:"",
            zmoney:"",
            feiyong:[],
            pay_way:"",
            usenames:"",
            inputval:"",
            yezhuorzuke:cate,
            payWay:"",
            jzTime:"",
            cate:cate,
            remarks:""
        }
    function gdata(){
            bui.ajax({
                url: apiUrl + "/mapi/bill/info",
                data: {
                    mode:mode,
                    id:billid
                },
                headers: {
                    clientid: "testclient",
                    token: islogin
                },
                method: "post"
            }).then(function(result){
                if(result.code == 0){
                    console.log(result)
                    jdata.housename = result.data.house;
                    jdata.tel = result.data.mobile;
                    console.log(result.data.mobile)
                    jdata.zkname = result.data.name;
                    jdata.zqtime = result.data.period;
                    jdata.rentTime = result.data.rentTime;
                    jdata.jzTime = result.data.time;
                    jdata.usenames = result.data.trader;
                    jdata.payWay = result.data.payWay;
                    jdata.zt = zt;
                    jdata.zmoney = result.data.costTotal;
                    jdata.remarks = result.data.remarks;
                    moneyarr= [];
                    $.each(result.data.cost,function(idx){
                        moneyarr.push(result.data.cost[idx])
                    })
                    console.log(moneyarr)
                    jdata.feiyong = moneyarr;
                }else{
                    bui.alert(result.msg);
                }
            },function(result,status){
                //console.log(status)//"timeout"
            });
            if(zt == 4){
                 moredata = [{name:"删除账单",value:"3"}]
            }else{
                 moredata = [{name:"编辑账单",value:"2"},{name:"删除账单",value:"3"}]
            }
          
        }
    var zdinfo = new Vue({
        el:"#zdinfo",
        data:jdata,
        methods: {
            qd:function(){
                bui.load({url:"pages/finance/confirm.html",param:{id:billid,tenantid:tenantid,cate:cate,ownerid:ownerid} });
            },
            cuizu:function(){
                bui.ajax({
                    url: apiUrl + "/mapi/bill/smsMsg",
                    data: {
                        mode:mode,
                        id:billid,
                        tenant_id:tenantid,
                        owner_id:ownerid,
                        cate:cate
                    },
                    headers: {
                    clientid: "testclient",
                    token: islogin
                     },
                    method: "post"
                }).then(function(result){
                    if(result.code == 0){
                        bui.alert(result.msg);
                    }else{
                        bui.alert(result.msg);
                    }
                },function(result,status){
                    //console.log(status)//"timeout"
                });
            }
        },
        mounted:function(){
            gdata()
        }
    })
      var uiActionsheet = bui.actionsheet({
                        trigger: "#mores",
                        buttons:moredata,
                        callback:function(e,ui){
                            var val = $(this).attr("value");
                             if (val == "cancel") {
                                uiActionsheet.hide();
                             };
                             if (val == "1") {
                                uiActionsheet.hide();
                                bui.load({url:"pages/finance/addzd",param:{id:billid,tenantid:tenantid,cate:cate,ownerid:ownerid,ifadd:0} });
                             }
                             if (val == "2") {
                                uiActionsheet.hide();
                                bui.load({url:"pages/finance/addzd",param:{id:billid,tenantid:tenantid,cate:cate,ownerid:ownerid,ifadd:1} });
                             }
                             if(val=="3"){
                                uiActionsheet.hide();
                                bui.ajax({
                                    url: apiUrl + "/mapi/bill/del",
                                    data: {
                                       mode:mode,
                                       id:billid,
                                       tenant_id:tenantid,
                                       owner_id:ownerid,
                                       cate:cate
                                    },
                                    headers: {
                                        clientid: "testclient",
                                        token: islogin
                                    },
                                    method: "post"
                                }).then(function(result){
                                    if(result.code==0){
                                        bui.alert("删除成功",function(){
                                            router.back({
                                                 callback: function(mod) {
                                                   mod.pageview.$options.mounted[0]()
                                                 }
                                            })
                                        }); 
                                    }else{
                                        bui.alert(result.msg);
                                    }
                                },function(result,status){
                                    //console.log(status)//"timeout"
                                });
                             }
                        }
                    })
    return {
        pageName: "zdinfo",
        pageview: zdinfo
    };
});