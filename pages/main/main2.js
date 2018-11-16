// 默认已经定义了main模块
loader.define(function (require, exports, module) {
    mode = 2;
    var islogin = tokenstorage.get("tokens");
    //权限
    bui.ajax({
        url: apiUrl + "/mapi/user/powers",
        data: {},
        headers: {
            clientid: "testclient",
            token: islogin
        },
        method: "post"
    }).then(function (result) {
        if (result.code == 0) {
            power = result.data;
            powerz(result.data.son)
        }
    }, function (result, status) {

    });
    var main2 = new Vue({
        el: "#main2",
        data: {
            rtb: "",
            ow: "",
            expire_7day: "",
            expire_0day: "",
            room_bespeak: "",
            rent_rate: "",
            room_average_price: "",
            money_rate: "",
            expect_difference: ""
        },
        methods: {
            fensan: function () {
                    router.replace({
                        url: "pages/main/main.html"
                    });
                },
                gotyuyue: function () {
                    router.replace({
                        url: "pages/reserve/servelist",
                        param: {
                            st: 1
                        }
                    });
                },
                gotozuyue: function () {
                    if (power_rent_owner_info == 1 && power_rent_tenant_info == 1) {
                        bui.alert("你没有权限查看");
                        return false;
                    } else {
                        if (power_rent_owner_info == 0 && power_rent_tenant_info == 0) {
                            router.load({
                                url: "pages/rent/contractlist.html",
                                param: {}
                            });
                        } else if (power_rent_tenant_info == 0) {
                            router.load({
                                url: "pages/rent/contractlist.html",
                                param: {
                                    trader_num: 0
                                }
                            })
                        } else if (power_rent_owner_info == 0) {
                            router.load({
                                url: "pages/rent/contractlist.html",
                                param: {
                                    trader_num: 1
                                }
                            })
                        }
                    }
                    //router.load({url:"pages/rent/contractlist.html",param:{}});
                },
                gotozd: function () {
                    if (power_rent_owner_bill_info == 1 && power_rent_tenant_bill_info == 1) {
                        bui.alert("你没有权限查看");
                        return false;
                    } else {
                        if (power_rent_owner_bill_info == 0 && power_rent_tenant_bill_info == 0) {
                            router.load({
                                url: "pages/finance/zhangdan.html",
                                param: {
                                    mode: 2
                                }
                            });
                        } else if (power_rent_tenant_bill_info == 0) {
                            router.load({
                                url: "pages/finance/zhangdan.html",
                                param: {
                                    mode: 2,
                                    trader: 1
                                }
                            });
                        } else if (power_rent_owner_bill_info == 0) {
                            router.load({
                                url: "pages/finance/zhangdan.html",
                                param: {
                                    mode: 2,
                                    trader: 2
                                }
                            });
                        }
                    }
                },
                gotofb: function () {
                    if (power_rent_list == 1) {
                        bui.alert("你没有权限查看");
                        return false;
                    }
                    router.load({
                        url: "pages/release/releaseindex2.html",
                        param: {
                            mode: 2
                        }
                    });
                },
                gotoliushui: function () {
                    if (power_finance_flow_detail == 1) {
                        bui.alert("你没有权限查看");
                        return false;
                    }
                    router.load({
                        url: "pages/finance/money.html",
                        param: {
                            mode: 2
                        }
                    });
                },
                tipzd: function () {
                 if(power_rent_owner_bill_info == 1 && power_rent_tenant_bill_info == 1){
                    bui.alert("你没有权限查看");
                    return false;
                 }else
                  {if(power_rent_owner_bill_info == 0 && power_rent_tenant_bill_info == 0){
                     router.load({url:"pages/finance/zhangdan.html",param:{mode:2,status:1,money_type:1}});
                 }else if(power_rent_tenant_bill_info ==0){
                     router.load({url:"pages/finance/zhangdan.html",param:{mode:2,status:1,money_type:1,trader:1}});
                 }else if(power_rent_owner_bill_info == 0){
                     router.load({url:"pages/finance/zhangdan.html",param:{mode:2,status:1,money_type:1,trader:2}});
                 }
                }
                },
                tipzd1: function () {
                    if(power_rent_owner_bill_info == 1 && power_rent_tenant_bill_info == 1){
                    bui.alert("你没有权限查看");
                    return false;
                 }else {
                    if(power_rent_owner_bill_info == 0 && power_rent_tenant_bill_info == 0){
                     router.load({url:"pages/finance/zhangdan.html",param:{mode:2,status:2,money_type:2}});
                     }else if(power_rent_tenant_bill_info==0){
                         router.load({url:"pages/finance/zhangdan.html",param:{mode:2,status:2,money_type:2,trader:1}});
                     }else if(power_rent_owner_bill_info==0){
                         router.load({url:"pages/finance/zhangdan.html",param:{mode:2,status:2,money_type:2,trader:2}});
                     }
                }
                },
                clist: function () {
                    if(power_rent_owner_info == 1 && power_rent_tenant_info == 1){
                    bui.alert("你没有权限查看");
                    return false;
                }else{
                  if(power_rent_owner_info == 0 && power_rent_tenant_info == 0){
                        router.load({url:"pages/rent/contractlist.html",param:{status:1}});
                    }
                    else if(power_rent_tenant_info == 0){
                        router.load({url:"pages/rent/contractlist.html",param:{trader_num:0,status:1}})
                    }else if(power_rent_owner_info == 0){
                        router.load({url:"pages/rent/contractlist.html",param:{trader_num:1,status:1}})
                    }
                }
                },
                gotobaobiao:function(){
                if(power_report_operate_day == 1 && power_report_operate_month == 1 && power_report_finance_day == 1 && power_report_finance_month == 1){
                    bui.alert("你没有权限查看");
                    return false;
                }
                if(power_report_operate_month == 1 && power_report_finance_month == 1){
                    router.load({url:"pages/chart/days.html",param:{}});
                    return false;
                }
                router.load({url:"pages/chart/month.html",param:{}});
            },
                clist1: function () {
                if(power_rent_owner_info == 1 && power_rent_tenant_info == 1){
                    bui.alert("你没有权限查看");
                    return false;
                }else{
                  if(power_rent_owner_info == 0 && power_rent_tenant_info == 0){
                        router.load({url:"pages/rent/contractlist.html",param:{status:2}});
                    }else if(power_rent_tenant_info == 0){
                        router.load({url:"pages/rent/contractlist.html",param:{trader_num:0,status:2}})
                    }else if(power_rent_owner_info == 0){
                        router.load({url:"pages/rent/contractlist.html",param:{trader_num:1,status:2}})
                    }
                }
                }
        },
        mounted: function () {
            //报表权限
             if(power_report_finance == 1 && power_report_operate == 1){
                        $(".indextongji").hide();
            }
            var that = this;
            bui.ajax({
                url: apiUrl + "/mapi/home/index",
                data: {
                    mode: mode
                },
                headers: {
                    clientid: "testclient",
                    token: islogin
                },
                method: "post"
            }).then(function (result) {

                if (result.code == 0) {
                    console.log(result)
                    that.rtb = result.data.rtb_no;
                    that.ow = result.data.ow_no;
                    that.expire_7day = result.data.expire_7day;
                    that.expire_0day = result.data.expire_0day;
                    that.room_bespeak = result.data.room_bespeak;
                    that.rent_rate = result.data.rent_rate;
                    that.room_average_price = result.data.room_average_price;
                    that.money_rate = result.data.money_rate;
                    that.expect_difference = result.data.expect_difference;

                } else if (result.code == '06') {
                    bui.alert(result.msg, function () {
                        tokenstorage.remove("tokens");
                        window.location.href = domains;
                    });
                } else {
                    bui.alert(result.msg);
                }
                // 成功
            }, function (result, status) {
                //console.log(status)//"timeout"
            });

        }

    })
    return {
        pageName: "main2",
        pageview: main2
    }
})