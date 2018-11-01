"use strict";

loader.define(function (require, exports, module) {
    var islogin = tokenstorage.get("tokens");
    var params = router.getPageParams();
    var roomid = params.id;
    var zq = params.zq;
    //console.log(roomid)
    var moneyinfos = new Vue({
        el: "#moneyinfo",
        data: {
            moneyinfos: []
        },
        methods: {},
        mounted: function mounted() {
            var that = this;
            bui.ajax({
                url: apiUrl + "/mapi/finance/flowDetailBill",
                method: "POST",
                headers: {
                    clientid: "testclient",
                    token: islogin
                },
                data: {
                    rentBillid: roomid
                }
            }).then(function (res) {
                console.log(res);
                if (res.code == 0) {
                    that.moneyinfos = res.data.billInfo;
                    that.moneyinfos.zq = zq;
                } else {
                    bui.alert(data.msg);
                }
            }, function (res, status) {
                alert(status);
            });
        }
    });
});