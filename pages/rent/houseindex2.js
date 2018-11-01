'use strict';

loader.define(function (require, exports, module) {
    var islogin = tokenstorage.get("tokens");
    var arr = [];
    var nowpages = 1;
    var newdata2 = {
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

    var uiList2 = false;
    function getData2() {
        uiList2 && uiList2.destroy();
        newdata2.houselist = [];
        uiList2 = bui.list({
            id: "#scroll2",
            url: apiUrl + "/mapi/rent/rentList",
            method: "POST",
            headers: {
                clientid: "testclient",
                token: islogin
            },
            page: 1,
            pageSize: 20,
            data: {
                type: newdata2.housetype,
                rid: newdata2.housedata
            },
            //如果分页的字段名不一样,通过field重新定义
            field: {
                page: "page",
                data: "data.rent"
            },
            autoScroll: true,
            refresh: false,
            onLoad: function onLoad(scroll, data) {
                if (data.code == 0) {
                    if (data.data.length == 0) {
                        return false;
                    }
                    for (var i = 0; i < data.data.rent.length; i++) {
                        newdata2.houselist.push(data.data.rent[i]);
                    }
                }
            }

        });
    }

    var vm2 = new Vue({
        el: "#app2",
        data: newdata2,
        methods: {
            navs: function navs(indexs) {
                if (newdata2.show < 4) {
                    newdata2.show = 5;
                } else {
                    newdata2.show = indexs;
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
                newdata2.show = 5;
                if (indexs == '1') {
                    newdata2.now = now;
                    newdata2.housedata = dataids;
                } else if (indexs == '2') {
                    console.log(dataids);
                    newdata2.now1 = now;
                    newdata2.housetype = dataids;
                } else {
                    newdata2.now2 = now;
                }
                newdata2.houselist.length = 0;
                getData2();
            },
            openroom: function openroom(roomid, event) {
                var divheight = "<div class='h260'></div>";
                //alert(roomid)
                if (this.btnshow == roomid) {
                    this.btnshow = "-1";
                    $(event.currentTarget).removeClass("openbigroom");
                } else {
                    this.btnshow = roomid;
                    $(".rooms").removeClass("openbigroom");
                    var tt = $(event.currentTarget).index() % 3;
                    $(event.currentTarget).addClass("openbigroom");
                    $(event.currentTarget).find(".btns").css('left', -2.44 * tt - 0.07 + 'rem');
                    $(event.currentTarget).find(".jt").css('left', 2.44 * tt + 1.12 + 'rem');
                }
            },
            roominfo: function roominfo(e, htid) {
                router.load({ url: "pages/rent/roominfo.html", param: { id: e, htid: htid } });
            },
            htinfo: function htinfo(e, htid) {
                router.load({ url: "pages/rent/contractinfo.html", param: { id: e, htid: htid } });
            },
            qyue: function qyue(e, htid) {
                router.load({ url: "pages/rent/addcontract.html", param: { id: e, htid: htid } });
            }
        },
        mounted: function mounted() {
            getData2();
        }
    });

    bui.ajax({
        url: apiUrl + "/mapi/rent/rentStateList",
        data: {},
        headers: {
            clientid: "testclient",
            token: islogin
        },
        method: "post"
    }).then(function (result) {
        if (result.code == 0) {
            var tjarr = [];
            newdata2.housename = result.data.rentList;
            for (var k in result.data.rentState) {
                tjarr.push({ "name": result.data.rentState[k], "id": k });
            }
            newdata2.hstatus = tjarr;
        } else {
            bui.alert(result.msg, function (e) {
                tokenstorage.remove("tokens");
                window.location.href = domains;
            });
        }
    }, function (result, status) {});

    return {
        pageName: "houseindex2",
        pageview: vm2
    };
});