"use strict";

loader.define(function (require, exports, module) {
    var islogin = tokenstorage.get("tokens");
    var uiListcontract;
    var params = router.getPageParams();
    var yueid = params.yueid;
    var datacont = {
        infomsg: ""
    };
    var kfcont = new Vue({
        el: "#kfcont",
        data: datacont,
        methods: {
            qd: function qd() {
                bui.ajax({
                    url: apiUrl + "/mapi/reserve/success",
                    data: {
                        id: yueid
                    },
                    headers: {
                        clientid: "testclient",
                        token: islogin
                    },
                    method: "post"
                }).then(function (result) {
                    console.log(result);
                    if (result.code == 0) {
                        bui.alert(result.msg, function () {
                            router.back({
                                callback: function callback(mod) {
                                    mod.pageview.$options.mounted[0]();
                                }
                            });
                        });
                    } else {
                        bui.alert(result.msg);
                    }
                    // 成功
                }, function (result, status) {
                    //console.log(status)//"timeout"
                });
            },
            jujue: function jujue() {
                bui.prompt("请输入拒绝理由", function (ui) {
                    var text = $(this).text();
                    if (text == "取消") {
                        ui.close();
                    } else {
                        if (ui.value()) {
                            bui.ajax({
                                url: apiUrl + "/mapi/reserve/fail",
                                data: {
                                    id: yueid,
                                    reason: ui.value()
                                },
                                headers: {
                                    clientid: "testclient",
                                    token: islogin
                                },
                                method: "post"
                            }).then(function (result) {
                                if (result.code == 0) {
                                    bui.alert(result.msg, function () {
                                        router.back({
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
                            ui.close();
                        } else {
                            bui.hint("请输入拒绝理由");
                        }
                    }
                });
            }
        },
        mounted: function mounted() {
            contdata();
        }
    });

    function contdata() {
        bui.ajax({
            url: apiUrl + "/mapi/reserve/info",
            data: {
                id: yueid
            },
            headers: {
                clientid: "testclient",
                token: islogin
            },
            method: "post"
        }).then(function (result) {
            if (result.code == 0) {
                datacont.infomsg = result.data;
            } else {
                bui.alert(result.msg);
            }
        }, function (result, status) {});
    }
    return {
        pageName: "kfcont"
    };
});