'use strict';

loader.define(function (require, exports, module) {
    var islogin = tokenstorage.get("tokens");
    var denglu = function denglu(xhr) {
        xhr.setRequestHeader('token', islogin);xhr.setRequestHeader('clientid', 'testclient');
    };
    var arr = [];
    var nowpages = 1;
    var newdata = {
        housename: [],
        hstatus: [],
        hxtype: [],
        houselist: [],
        housedata: 0,
        housetype: 0,
        show: 5,
        now: '-1',
        now1: '-1',
        now2: '-1',
        btnshow: ''
    };

    var uiList = false;
    function getData() {
        bui.ajax({
            url: apiUrl + "/mapi/rent/rent",
            data: {},
            beforeSend: denglu,
            //这里设置header
            method: "post"
        }).then(function (result) {
            if (result.code == 0) {
                newdata.housename = result.data.rentCellList;
                newdata.hstatus = result.data.type;
            } else {
                bui.alert(result.msg, function (e) {
                    tokenstorage.remove("tokens");
                    window.location.href = domains;
                });
            }
        }, function (result, status) {});
        uiList && uiList.destroy();
        newdata.houselist = [];
        uiList = bui.list({
            id: "#scroll",
            url: apiUrl + "/mapi/rent/rent",
            method: "post",
            headers: {
                clientid: "testclient",
                token: islogin
            },
            page: 1,
            data: {
                type: newdata.housetype,
                rcid: newdata.housedata
            },
            //如果分页的字段名不一样,通过field重新定义
            field: {
                page: "page",
                data: "data.rent"
            },
            autoScroll: true,
            refresh: false,
            pageSize: 20,
            onLoad: function onLoad(scroll, data) {
                if (data.code == 0) {
                    $(".rooms").removeClass("openbigroom");
                    if (data.data.length == 0) {
                        return false;
                    }
                    newdata.btnshow = "-1";
                    for (var i = 0; i < data.data.rent.length; i++) {
                        newdata.houselist.push(data.data.rent[i]);
                    }
                }
            }

        });
    }

    var vm = new Vue({
        el: "#app",
        data: newdata,
        methods: {
            navs: function navs(indexs) {
                if (newdata.show < 4) {
                    newdata.show = 5;
                } else {
                    newdata.show = indexs;
                }
            },
            gotoaddroom: function gotoaddroom(id) {
                bui.load({ url: "pages/rent/addroom", param: { roomid: id } });
            },
            gotohouseinfo: function gotohouseinfo(id) {
                bui.load({ url: "pages/rent/houseinfo", param: { rentid: id } });
            },
            overselcet: function overselcet(indexs, text, now, dataids) {
                $(".k" + indexs).html(text);
                newdata.show = 5;
                if (indexs == '1') {
                    newdata.now = now;
                    newdata.housedata = dataids;
                } else if (indexs == '2') {
                    newdata.now1 = now;
                    newdata.housetype = dataids;
                } else {
                    newdata.now2 = now;
                }
                newdata.houselist.length = 0;
                getData();
            },
            openroom: function openroom(index, indexs, event, dataids) {
                if (newdata.btnshow == dataids) {
                    newdata.btnshow = "-1";
                    $(event.currentTarget).removeClass("openbigroom");
                } else {
                    newdata.btnshow = dataids;
                    $(".rooms").removeClass("openbigroom");
                    var tt = $(event.currentTarget).index() % 3;
                    $(event.currentTarget).addClass("openbigroom");
                    $(event.currentTarget).find(".btns").css('left', -2.44 * tt - 0.07 + 'rem');
                    $(event.currentTarget).find(".jt").css('left', 2.44 * tt + 1.12 + 'rem');
                }
            },
            fbroom: function fbroom(e, mode) {
                router.load({ url: "pages/rent/addroom.html", param: { rentid: e, mode: mode } });
            },
            roominfo: function roominfo(e, htid) {
                router.load({ url: "pages/rent/roominfo.html", param: { id: e, htid: htid } });
            },
            htinfo: function htinfo(e, htid) {
                router.load({ url: "pages/rent/contractinfo.html", param: { id: e, htid: htid, type: 0 } });
            },
            qyue: function qyue(e, htid) {
                router.load({ url: "pages/rent/addcontract.html", param: { id: e, htid: htid } });
            }
        },
        mounted: function mounted() {
            getData();
        }
    });

    return {
        pageName: "houseindex",
        pageview: vm
    };
});