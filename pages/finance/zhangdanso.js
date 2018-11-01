"use strict";

loader.define(function (require, exports, module) {
    var islogin = tokenstorage.get("tokens");
    var status = router.getPageParams().status;
    var zuyuetype = [];
    var htstyle = [];
    var htobject = [];
    var houselists = [];
    var yezhu = [];
    var moneydata = {
        zuyuetype: [],
        htstyle: [],
        yezhu: [],
        htobject: [],
        clist: [],
        yezhuid: "",
        revenue: "",
        rentid: "",
        btnshow: ''
    };
    var uiListcontract;

    function postdata() {
        var uiSearchbar = bui.searchbar({
            id: "#searchbar",
            callback: function callback(ui, keyword) {
                $("#scrollso .bui-list").empty();
                moneydata.clist = [];
                uiListcontract && uiListcontract.destroy();
                uiListcontract = bui.list({
                    id: "#scrollcontract",
                    url: apiUrl + "/mapi/bill/list",
                    method: "POST",
                    headers: {
                        clientid: "testclient",
                        token: islogin
                    },
                    page: 1,
                    pageSize: 20,
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
        });
    }
    var zhangdanlistso = new Vue({
        el: "#zhangdanso",
        data: moneydata,
        methods: {
            hoverinfo: function hoverinfo(e, zt, tenantid, ownerid, cate) {
                router.load({
                    url: "pages/finance/zhangdaninfo.html",
                    param: {
                        id: e,
                        zhuantai: zt,
                        tenantid: tenantid,
                        ownerid: ownerid,
                        cate: cate
                    }
                });
            }

        },
        mounted: function mounted() {
            postdata();
        }
    });
    return {
        pageName: "zhangdanlistso",
        pageview: zhangdanlistso
    };
});