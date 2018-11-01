"use strict";

loader.define(function (require, exports, module) {
    var islogin = tokenstorage.get("tokens");
    mode = router.getPageParams().mode;
    var zuyuetype = [];
    var htstyle = [];
    var htobject = [];
    var houselists = [];
    var moneydata = {
        zuyuetype: [],
        htstyle: [],
        htobject: [],
        clist: [],
        moneyOut: "",
        moneyIn: "",
        revenue: "",
        Moneytype: "",
        payway: "",
        s_stimes: "",
        s_etimes: "",
        show: 5,
        now: '-1',
        now1: '-1',
        now2: '-1',
        btnshow: ''
    };
    var uiListcontract;
    function postdata() {
        moneydata.clist = [];
        uiListcontract && uiListcontract.destroy();
        if (moneydata.s_stimes != "" && moneydata.s_etimes != "") {
            var timeso = moneydata.s_stimes + ' ~ ' + moneydata.s_etimes;
        } else {
            var timeso = "";
        }
        uiListcontract = bui.list({
            id: "#scrollcontract",
            url: apiUrl + "/mapi/finance/flowDetail",
            method: "POST",
            headers: {
                clientid: "testclient",
                token: islogin
            },
            page: 1,
            pageSize: 1,
            data: {
                mode: mode,
                time: timeso,
                money_type: moneydata.Moneytype,
                collect: moneydata.payway
            },
            autoScroll: true,
            refresh: false,
            //如果分页的字段名不一样,通过field重新定义
            field: {
                page: "page",
                data: "data.flowList"
            },
            onLoad: function onLoad(scroll, data) {
                console.log(data);
                if (data.code == 0) {
                    if (data.data.page == 1) {
                        moneydata.moneyOut = data.data.moneyOut;
                        moneydata.moneyIn = data.data.moneyIn;
                        moneydata.revenue = data.data.revenue;
                    }
                    for (var i = 0; i < data.data.flowList.length; i++) {
                        moneydata.clist.push(data.data.flowList[i]);
                    }
                } else {
                    bui.alert(res.msg);
                    // bui.alert(data.msg);
                }
            },
            callback: function callback(e) {
                // 点击整行的时候执行
            }
        });
    }
    var contractlist = new Vue({
        el: "#money",
        data: moneydata,
        methods: {
            navs: function navs(indexs) {
                if (moneydata.show < 4) {
                    moneydata.show = 5;
                } else {
                    moneydata.show = indexs;
                }
            },
            overselcet: function overselcet(indexs, text, now, ids) {
                $(".k" + indexs).html(text);
                moneydata.show = 5;
                if (indexs == '1') {
                    moneydata.now = now;
                    moneydata.Moneytype = ids;
                } else if (indexs == '2') {
                    moneydata.now1 = now;
                    moneydata.payway = ids;
                } else {
                    moneydata.now2 = now;
                }
                postdata();
            },
            hoverinfo: function hoverinfo(e, zq) {
                router.load({ url: "pages/finance/moneyinfo.html", param: { id: e, zq: zq } });
            }

        },
        mounted: function mounted() {
            postdata();
        }
    });
    bui.ajax({
        url: apiUrl + "/mapi/finance/flowDetail",
        method: "POST",
        headers: {
            clientid: "testclient",
            token: islogin
        },
        data: {
            mode: mode,
            page: 1
        }
    }).then(function (res) {
        if (res.code == 0) {
            for (var k in res.data.moneyTypeArr) {
                zuyuetype.push({ name: res.data.moneyTypeArr[k], ids: k });
            }
            for (var k in res.data.collectArr) {
                htstyle.push({ name: res.data.collectArr[k], ids: k });
            }
            moneydata.zuyuetype = zuyuetype;
            moneydata.htstyle = htstyle;
        } else {
            bui.alert(res.msg);
        }
        // moneydata.htobject = htobject;
    }, function (res, status) {
        alert(status);
    });
    var datePrevVal;
    var datePrevVal1;
    var myDate = new Date();
    var yue = parseInt(myDate.getMonth()) + 1;
    var begintime = myDate.getFullYear() + '-' + yue + '-' + myDate.getDate();
    $("#starttimes").val("开始时间");
    $("#endtimes").val("结束时间");
    var kstime = bui.pickerdate({
        handle: "#starttimes",
        min: '2015-08-10',
        max: begintime,
        formatValue: "yyyy-MM-dd",
        cols: {
            hour: "none",
            minute: "none",
            second: "none"
        },
        // 如果需要按钮,需要自己写callback
        buttons: ["取消", "确定"],
        callback: function callback() {
            // 取消返回上一个值
            if ($(this).text().trim() == "取消") {
                kstime.value(datePrevVal);
            } else {
                $("#starttimes").val(kstime.value());
                moneydata.s_stimes = kstime.value();
                postdata();
            }
        }
    });
    datePrevVal = kstime.value();
    var jstime = bui.pickerdate({
        // id: "#datepicker_contanier",
        handle: "#endtimes",
        min: '2015-08-10',
        formatValue: "yyyy-MM-dd",
        max: begintime,
        cols: {
            hour: "none",
            minute: "none",
            second: "none"
        },
        // 如果需要按钮,需要自己写callback
        buttons: ["取消", "确定"],
        callback: function callback() {
            // 取消返回上一个值
            if ($(this).text().trim() == "取消") {
                jstime.value(datePrevVal);
            } else {
                var kt = new Date(kstime.value().replace(/\-/g, "\/"));
                var et = new Date(jstime.value().replace(/\-/g, "\/"));
                if (kt < et) {
                    $("#endtimes").val(jstime.value());
                    moneydata.s_etimes = jstime.value();
                    postdata();
                }
            }
        }
    });
    datePrevVal1 = jstime.value();
    return {
        pageName: "contractlist",
        pageview: contractlist
    };
});