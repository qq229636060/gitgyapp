'use strict';

// 默认已经定义了main模块
loader.define(function (require, exports, module) {
    var tj = true;
    var islogin = tokenstorage.get("tokens");
    var denglu = function denglu(xhr) {
        xhr.setRequestHeader('token', islogin);
        xhr.setRequestHeader('clientid', 'testclient');
    };
    if (islogin) {
        router.replace({
            url: "pages/main/main.html"
        });
    }
    var logins = new Vue({
        el: "#login",
        data: {
            iddata: {
                ids: "",
                password: ""
            }
        },
        methods: {
            loginbtn: function loginbtn() {
                if (this.iddata.id == "") {
                    bui.alert("请输入用户名");
                } else if (this.iddata.password == "") {
                    bui.alert("请输入密码");
                } else {
                    if (tj) {
                        tj = false;
                        bui.ajax({
                            url: apiUrl + "/mapi/user/login",
                            data: {
                                response_type: "code",
                                client_id: "testclient",
                                state: "state",
                                authorized: "yes",
                                acc: this.iddata.ids,
                                pwd: '' + CryptoJS.MD5(this.iddata.password)
                            },
                            contentType: "application/x-www-form-urlencoded",
                            method: "post",
                            dataType: "json"
                        }).then(function (res) {
                            if (res.code == 0) {
                                tokenstorage.set("tokens", res.data.access_token);
                                bui.hint({
                                    content: "<i class='icon-check'></i><br />登录成功",
                                    position: "center",
                                    effect: "fadeInDown",
                                    onClose: function onClose() {
                                        router.replace({
                                            url: "pages/main/main.html"
                                        });
                                    }
                                });
                            } else if (res.code == '-2') {
                                bui.alert(res.msg);
                                tj = true;
                            } else {
                                bui.alert(res.msg);
                                tj = true;
                            }
                        }, function (res, status) {
                            console.log(status);
                            tj = true;
                        });
                    }
                }
                return false;
            }
        },
        mounted: function mounted() {}
    });
});