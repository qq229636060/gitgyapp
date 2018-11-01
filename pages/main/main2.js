"use strict";

// 默认已经定义了main模块
loader.define(function (require, exports, module) {
    mode = 2;
    var islogin = tokenstorage.get("tokens");
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
            fensan: function fensan() {
                router.replace({ url: "pages/main/main.html" });
            },
            gotyuyue: function gotyuyue() {
                router.replace({ url: "pages/reserve/servelist", param: { st: 1 } });
            }
        },
        mounted: function mounted() {
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
                    console.log(result);
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

    });
    return {
        pageName: "main2",
        pageview: main2
    };
});