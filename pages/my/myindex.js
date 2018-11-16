'use strict';

loader.define(function (require, exports, module) {
    var islogin = tokenstorage.get("tokens");
    var denglu = function denglu(xhr) {
        xhr.setRequestHeader('token', islogin);
        xhr.setRequestHeader('clientid', 'testclient');
    };
    var myindexdata = {
        usecenter: [],
        faceimg: "",
        qrcode_url: "",
        qcodepic: "",
        powers_z: ""
    };
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
            if (result.data.son == 0) {
                myindexdata.powers_z = 0;
            } else {
                myindexdata.powers_z = 1;
            }
        }
    }, function (result, status) {});
    function getmyindex() {
        $("body").on("click", ".myshops", function () {
            $(".myshops").hide();
        });

        bui.ajax({
            url: apiUrl + "/mapi/user/info",
            data: {},
            method: "POST",
            dataType: "json",
            beforeSend: denglu
        }).then(function (result) {
            if (result.code == 0) {
                myindexdata.usecenter = result.data;
                if (result.data.avatar == "") {
                    myindexdata.faceimg = "../../images/icon/face.png";
                } else {
                    myindexdata.faceimg = result.data.picDomain + result.data.avatar;
                }
            } else {
                bui.alert(result.msg);
            }
        }, function (result, status) {
            //console.log(status)//"timeout"
        });
    }
    var myindex = new Vue({
        el: "#myindex",
        data: myindexdata,
        methods: {
            tels: function tels() {
                window.location.href = 'tel:4001330519';
            },
            myshop: function myshop() {
                bui.ajax({
                    url: apiUrl + "/mapi/user/shop",
                    data: {},
                    beforeSend: denglu,
                    method: "post"
                }).then(function (result) {
                    if (result.code == 0) {
                        new QRCode(document.getElementById("qrcode"), result.data.qrcode_url);
                        $(".myshops").show();
                    } else {
                        bui.alert(result.msg);
                    }
                }, function (result, status) {
                    //console.log(status)//"timeout"
                });
            }
        },
        mounted: function mounted() {
            getmyindex();
        }
    });
    return {
        pageName: "myindex",
        pageview: myindex
    };
});