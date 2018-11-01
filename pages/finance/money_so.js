"use strict";

loader.define(function (require, exports, module) {
    var islogin = tokenstorage.get("tokens");
    var houselists = [];
    var moneydataso = {
        zuyuetype: [],
        htstyle: [],
        htobject: [],
        clist: [],
        moneyOut: "",
        moneyIn: "",
        revenue: "",
        Moneytype: "",
        payway: "",
        btnshow: ''
    };
    var uiListcontract;
    function postdata() {
        var uiSearchbar = bui.searchbar({
            id: "#searchbar",
            callback: function callback(ui, keyword) {
                $("#scrollso .bui-list").empty();
                moneydataso.clist = [];
                uiListcontract && uiListcontract.destroy();
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
                        kw: keyword
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
                                moneydataso.moneyOut = data.data.moneyOut;
                                moneydataso.moneyIn = data.data.moneyIn;
                                moneydataso.revenue = data.data.revenue;
                            }
                            for (var i = 0; i < data.data.flowList.length; i++) {
                                moneydataso.clist.push(data.data.flowList[i]);
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
        });
    }
    var moneyso = new Vue({
        el: "#moneyso",
        data: moneydataso,
        methods: {
            hoverinfo: function hoverinfo(e, zq) {
                router.load({ url: "pages/finance/moneyinfo.html", param: { id: e, zq: zq } });
            }

        },
        mounted: function mounted() {
            postdata();
        }
    });
    return {
        pageName: "moneyso",
        pageview: moneyso
    };
});