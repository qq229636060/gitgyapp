"use strict";

loader.define(function (require, exports, module) {
    var islogin = tokenstorage.get("tokens");
    var params = router.getPageParams();
    var billid = params.id;
    var tenantid = params.tenantid;
    var ownerid = params.ownerid;
    var cate = params.cate;
    var paywayarr = [];
    var confirm = new Vue({
        el: "#confirm",
        data: {
            housename: "",
            tel: "",
            zkname: "",
            zqtime: "",
            rentTime: "",
            zt: "",
            zmoney: "",
            feiyong: [],
            pay_way: "",
            payfunction: 0,
            times: "请选择实际支付时间",
            tenant_id: ""

        },
        methods: {
            qd: function qd() {
                if (this.payfunction == 0) {
                    bui.alert("请选择支付方式");
                    return false;
                }
                if (this.times == '请选择实际支付时间') {
                    bui.alert("请选择实际支付时间");
                    return false;
                }
                bui.ajax({
                    url: apiUrl + "/mapi/bill/confirm",
                    data: {
                        mode: mode,
                        id: billid,
                        tenant_id: tenantid,
                        cate: cate,
                        owner_id: ownerid,
                        pay_way: this.payfunction,
                        pay_time: this.times
                    },
                    headers: {
                        clientid: "testclient",
                        token: islogin
                    },
                    method: "post"
                }).then(function (result) {
                    if (result.code == 0) {
                        bui.alert("确认交租", function () {
                            router.back({
                                index: "-2",
                                callback: function callback(mod) {
                                    mod.pageview.$options.mounted[0]();
                                }
                            });
                        });
                    } else {
                        bui.alert(result.msg);
                    }
                }, function (result, status) {
                    //console.log(status)//"timeout"
                });
            }
        },
        mounted: function mounted() {
            var that = this;
            bui.ajax({
                url: apiUrl + "/mapi/bill/info",
                data: {
                    mode: mode,
                    id: billid
                },
                headers: {
                    clientid: "testclient",
                    token: islogin
                },
                method: "post"
            }).then(function (result) {
                if (result.code == 0) {
                    that.housename = result.data.house;
                    that.tel = result.data.mobile;
                    that.zkname = result.data.name;
                    that.zqtime = result.data.period;
                    that.rentTime = result.data.rentTime;
                    that.zmoney = result.data.costTotal;
                    $.each(result.data.payWayArr, function (idx) {
                        paywayarr.push({ name: result.data.payWayArr[idx], id: idx });
                    });
                    that.pay_way = paywayarr;
                    var myDate = new Date();
                    var yue = parseInt(myDate.getMonth()) + 1;
                    var begintime = myDate.getFullYear() + '-' + yue + '-' + myDate.getDate();
                    var input = $("#datepickerpay");
                    var uiPickerdate = bui.pickerdate({
                        handle: "#datepickerpay",
                        value: begintime,
                        formatValue: "yyyy-MM-dd",
                        max: begintime,
                        cols: {
                            hour: "none",
                            minute: "none",
                            second: "none"
                        },
                        onChange: function onChange(value) {
                            input.val(value);
                            that.times = value;
                        }
                    });
                } else {
                    bui.alert(result.msg);
                }
            }, function (result, status) {
                //console.log(status)//"timeout"
            });
        }
    });
});