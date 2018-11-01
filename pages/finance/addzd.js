"use strict";

loader.define(function (require, exports, module) {
    var islogin = tokenstorage.get("tokens");
    var params = router.getPageParams();
    var billid = params.id;
    var zt = params.zhuantai;
    var tenantid = params.tenantid;
    var ownerid = params.ownerid;
    var cate = params.cate;
    var ifadd = params.ifadd;
    var rentid = params.rentid;
    var names = params.names;
    var payarr = [];
    var allpays = [];
    var paysing = [];
    var strs = new Array();
    var strs1 = new Array();
    var addzd = new Vue({
        el: "#addzd",
        data: {
            usenames: "",
            times: "请选择时间",
            timee: "请选择时间",
            paytime: "请选择时间",
            payinfo: [],
            othershow: "",
            beizhu: "",
            allcost: []
        },
        methods: {
            savezd: function savezd() {
                var that = this;
                if (ifadd == 0) {
                    billid = "";
                }
                var betime = that.times;
                var endtime = that.timee;
                var d1 = betime.split('-');
                var d2 = endtime.split('-');
                var sdate = new Date(d1[0], parseInt(d1[1] - 1), d1[2]);
                var edate = new Date(d2[0], parseInt(d2[1] - 1), d2[2]);
                if (sdate > edate) {
                    bui.alert("开始时间不能大于结束时间");
                    return false;
                }
                console.log(that.payinfo);
                var objtype = {};
                var objtype1 = {};
                $.each(that.payinfo, function (idx) {
                    objtype[that.payinfo[idx].value] = that.payinfo[idx].costType;
                    objtype1[that.payinfo[idx].value] = that.payinfo[idx].money;
                });

                bui.ajax({
                    url: apiUrl + "/mapi/bill/save",
                    data: {
                        mode: mode,
                        id: billid,
                        tenant_id: tenantid,
                        owner_id: ownerid,
                        bill_time: that.times + ' ~ ' + that.timee,
                        rent_time: that.paytime,
                        type: objtype,
                        cost: objtype1,
                        remarks: that.beizhu,
                        cate: cate
                    },
                    headers: {
                        clientid: "testclient",
                        token: islogin
                    },
                    method: "post"
                }).then(function (result) {
                    if (result.code == 0) {
                        bui.alert("保存成功", function () {
                            router.back({
                                callback: function callback(mod) {
                                    console.log(mod);
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
            var inputs = $("#datepicker_input_s");
            var inpute = $("#datepicker_input_e");
            var payinput = $("#paytime");
            if (ifadd == 0) {
                bui.ajax({
                    url: apiUrl + "/mapi/common/getAllCollect",
                    data: {},
                    headers: {
                        clientid: "testclient",
                        token: islogin
                    },
                    method: "post"
                }).then(function (result) {
                    if (result.code == 0) {
                        that.usenames = names;
                        for (var i in result.data.allCollect) {
                            allpays.push({
                                name: result.data.allCollect[i],
                                value: i
                            });
                            var uiSelect = bui.select({
                                title: "请选择扣款",
                                type: "checkbox",
                                height: "500",
                                data: allpays,
                                //如果需要点击再进行操作,增加按钮
                                buttons: [{
                                    name: "重置",
                                    className: ""
                                }, {
                                    name: "确定",
                                    className: "primary-reverse"
                                }],
                                callback: function callback(e) {
                                    var str = uiSelect.text();
                                    var str1 = uiSelect.value();
                                    var strs = str.split(",");
                                    var strs1 = str1.split(",");
                                    var newarr = [];
                                    $.each(strs, function (idx) {
                                        newarr.push({
                                            name: strs[idx],
                                            value: strs1[idx],
                                            costType: '1'
                                        });
                                    });
                                    that.payinfo = newarr;
                                    var index = $(this).parent().index();
                                    if (index == 0) {
                                        uiSelect.selectNone();
                                    } else {
                                        uiSelect.hide();
                                    }
                                },
                                onChange: function onChange(argument) {
                                    //console.log(argument)
                                }
                            });
                            $("#addrefundmoney").on("click", function () {
                                uiSelect.show();
                            });
                        }
                    } else {
                        bui.alert(result.msg);
                    }
                }, function (result, status) {
                    //console.log(status)//"timeout"
                });
            } else {
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
                        that.usenames = result.data.name;
                        for (var i in result.data.allCollect) {
                            allpays.push({
                                name: result.data.allCollect[i],
                                value: i
                            });
                        }
                        var uiSelect = bui.select({
                            title: "请选择扣款",
                            type: "checkbox",
                            height: "500",
                            data: allpays,
                            //如果需要点击再进行操作,增加按钮
                            buttons: [{
                                name: "重置",
                                className: ""
                            }, {
                                name: "确定",
                                className: "primary-reverse"
                            }],
                            callback: function callback(e) {
                                var str = uiSelect.text();
                                var str1 = uiSelect.value();
                                var strs = str.split(",");
                                var strs1 = str1.split(",");
                                var newarr = [];
                                $.each(strs, function (idx) {
                                    newarr.push({
                                        name: strs[idx],
                                        value: strs1[idx],
                                        costType: '1'
                                    });
                                });
                                that.payinfo = newarr;
                                var index = $(this).parent().index();
                                if (index == 0) {
                                    uiSelect.selectNone();
                                } else {
                                    uiSelect.hide();
                                }
                            },
                            onChange: function onChange(argument) {
                                //console.log(argument)
                            }
                        });
                        $("#addrefundmoney").on("click", function () {
                            uiSelect.show();
                        });

                        $.each(result.data.cost, function (idx) {
                            payarr.push(result.data.cost[idx]);
                        });
                        console.log(payarr);
                        for (var i in result.data.cost) {
                            paysing.push({
                                name: result.data.cost[i].name,
                                value: i,
                                money: Math.abs(result.data.cost[i].money),
                                costType: result.data.cost[i].costType
                            });
                        }
                        that.payinfo = paysing;
                        that.paytime = result.data.rentTime;
                        that.times = result.data.startTime;
                        that.timee = result.data.endTime;
                        that.beizhu = result.data.remarks;
                    } else {
                        bui.alert(result.msg);
                    }
                }, function (result, status) {
                    //console.log(status)//"timeout"
                });
            }

            var uiPickerdate_s = bui.pickerdate({
                handle: "#datepicker_input_s",
                formatValue: "yyyy-MM-dd",
                rotateEffect: true,
                cols: {
                    hour: "none",
                    minute: "none",
                    second: "none"
                },
                onChange: function onChange(value) {
                    inputs.val(value);
                    that.times = value;
                }
                // 如果不需要按钮,设置为空
                // buttons: null
            });
            var uiPickerdate_e = bui.pickerdate({
                handle: "#datepicker_input_e",
                formatValue: "yyyy-MM-dd",
                rotateEffect: true,
                cols: {
                    hour: "none",
                    minute: "none",
                    second: "none"
                },
                onChange: function onChange(value) {
                    inpute.val(value);
                    that.timee = value;
                }
                // 如果不需要按钮,设置为空
                // buttons: null
            });
            var paytimes = bui.pickerdate({
                handle: "#paytime",
                formatValue: "yyyy-MM-dd",
                rotateEffect: true,
                cols: {
                    hour: "none",
                    minute: "none",
                    second: "none"
                },
                onChange: function onChange(value) {
                    payinput.val(value);
                    that.paytime = value;
                }
                // 如果不需要按钮,设置为空
                // buttons: null
            });
        }
    });
    return {
        pageName: "addzd",
        pageview: addzd
    };
});