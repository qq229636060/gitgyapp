"use strict";

loader.define(function (require, exports, module) {
    var zuyuetype = [];
    var htstyle = [];
    var htobject = [];
    var houselists = [];
    var leaseStatus_num = "";
    var trader_num = 1;
    var params = router.getPageParams();
    var st = params.st;
    var islogin = tokenstorage.get("tokens");
    var uiListcontract;
    var denglu = function denglu(xhr) {
        xhr.setRequestHeader('token', islogin);xhr.setRequestHeader('clientid', 'testclient');
    };
    var databox = {
        stBespeak: [],
        clist: [],
        show: 5,
        now: '-1',
        btnshow: '',
        iconface: 0,
        types: "",
        val: "0",
        sttime: "",
        edtime: ""
    };
    var servelist = new Vue({
        el: "#yuyuelist",
        data: databox,
        methods: {
            navs: function navs(indexs) {
                if (this.show < 4) {
                    this.show = 5;
                } else {
                    this.show = indexs;
                }
            },
            hover_info: function hover_info(e) {
                router.load({ url: "pages/reserve/kfcont.html", param: { yueid: e } });
            },
            overselcet: function overselcet(indexs, text, now) {
                $(".k" + indexs).html(text);
                this.show = 5;
                if (indexs == '1') {
                    this.now = now;
                    databox.val = parseInt(now) + 1;
                }
                getdatas();
            }

        },
        mounted: function mounted() {
            getdatas();
        }
    });
    /*条件*/
    bui.ajax({
        url: apiUrl + "/mapi/reserve/config",
        beforeSend: denglu,
        method: "post",
        data: {}
    }).then(function (res) {
        if (res.code == 0) {
            console.log(res);
            $.each(res.data.stBespeak, function (index) {
                zuyuetype.push(res.data.stBespeak[index]);
            });
            databox.stBespeak = zuyuetype;
        }
    }, function (res, status) {
        alert(status);
    });

    function getdatas() {
        if (st == 1) {
            databox.val = 1;
            st = "";
        }
        uiListcontract && uiListcontract.destroy();
        databox.iconface = 0;
        databox.clist = [];

        uiListcontract = bui.list({
            id: "#scrollcontract",
            url: apiUrl + "/mapi/reserve/list",
            method: "post",
            headers: {
                clientid: "testclient",
                token: islogin
            },
            page: 1,
            pageSize: 15,
            data: {
                mode: mode,
                stime: databox.sttime,
                etime: databox.edtime,
                st: databox.val
            },
            refresh: false,
            //如果分页的字段名不一样,通过field重新定义
            field: {
                page: "page",
                data: "data.list"
            },
            onLoad: function onLoad(scroll, data) {
                if (data.code == 0) {
                    databox.types = 0;
                    for (var i = 0; i < data.data.list.length; i++) {
                        databox.clist.push(data.data.list[i]);
                    }
                } else if (data.code == "06") {
                    bui.alert(data.msg, function (e) {
                        tokenstorage.remove("tokens");
                        window.location.href = domains;
                    });
                } else if (data.code == "-86") {
                    bui.alert(data.msg, function () {
                        router.replace({ url: "pages/main/main.html" });
                    });
                }
            },
            callback: function callback(e) {
                // 点击整行的时候执行
            }
        });
    }
    var myDate = new Date();
    var datePrevVal;
    var datePrevVal1;
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
                databox.sttime = kstime.value();
                getdatas();
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
            // 
            if ($(this).text().trim() == "取消") {
                jstime.value(datePrevVal);
            } else {
                var kt = new Date(kstime.value().replace(/\-/g, "\/"));
                var et = new Date(jstime.value().replace(/\-/g, "\/"));
                if (kt < et) {
                    $("#endtimes").val(jstime.value());
                    databox.edtime = jstime.value();
                    getdatas();
                }
            }
        }
    });
    datePrevVal1 = jstime.value();
    return {
        pageName: "servelist",
        pageview: servelist
    };
});