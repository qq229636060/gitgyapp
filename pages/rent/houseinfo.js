loader.define(function(require, exports, module) {
    var islogin = tokenstorage.get("tokens");
    var params = router.getPageParams();
    var rentid = params.rentid;
    var checked = 1;
    var modes = mode;
    var listView;
    var housedata = {
        mode: mode,
        houseid: "",
        addfloors: "",
        addrooms: "",
        ownerid: "",
        houseinfo: {
            city: "",
            xqname: "",
            qy: "",
            qy1: "",
            xqadder: "",
            mp1: "",
            mp2: "",
            mp3: "",
            zuping: "",
            rooms: [],
            gyname: "",
            //集中式公寓名称
            zfloor: "",
            //集中式楼层总数
            zrooms: "",
            //集中式房间总数
            pub: [],
            //集中公共区域
            jzrooms: [] //集中楼层
        }
    }

    function gethouse() {
        bui.ajax({
            url: apiUrl + "/mapi/rent/info",
            data: {
                rent_id: rentid,
                mode: mode
            },
            headers: {
                clientid: "testclient",
                token: islogin
            },
            method: "post"
        }).then(function(result) {
            if (result.code == 0) {
                console.log(result);
                housedata.houseid = result.data.rent.id;
                housedata.houseinfo.city = result.data.rent.city;
                housedata.houseinfo.xqname = result.data.rent.cell_name;
                housedata.houseinfo.qy = result.data.rent.region;
                housedata.houseinfo.qy1 = result.data.rent.plate;
                housedata.houseinfo.xqadder = result.data.rent.cell_address;
                housedata.houseinfo.mp1 = result.data.rent.building;
                housedata.houseinfo.mp2 = result.data.rent.unit;
                housedata.houseinfo.mp3 = result.data.rent.floor;
                housedata.houseinfo.mp4 = result.data.rent.number;
                housedata.houseinfo.zuping = result.data.rent.mold;
                housedata.ownerid = result.data.owner;
                if (modes == 1) {
                    housedata.houseinfo.rooms = result.data.roomList;
                } else {
                    housedata.houseinfo.jzrooms = result.data.floorList;
                    housedata.houseinfo.gyname = result.data.rent.apartment;
                    housedata.houseinfo.zfloor = result.data.rent.floor;
                    housedata.houseinfo.zrooms = result.data.rent.room;
                    housedata.houseinfo.pub = result.data.public_area;
                }
                addhousez.$nextTick(function(){
                     if(power_rent_room_del != 1){
                            listView && listView.destroy();
                            listView = bui.listview({
                                id: "#listview",
                                data: [{
                                    "text": "删除",
                                    "classname": "danger"
                                }],
                                menuWidth: 80,
                                callback: function(e, menu) {
                                    var roomli = $(this).parent().parent();
                                    bui.confirm({
                                        "title": "",
                                        "content": '<div class="bui-box-center"><p>是否删除楼层</p><p><em class="fxk">√</em>同时删除已确认账单和流水</p></div>',
                                        "buttons": [{
                                            name: "确定",
                                            className: "primary-reverse"
                                        }, {
                                            name: "取消",
                                            className: "primary-reverse"
                                        }]
                                    }, function() {
                                        if ($(this).text() == "确定" && mode == 1) {
                                            var roomid = roomli.attr("data_roomid");
                                            if ($(".fxk").html() == "") {
                                                checked = "0"
                                            }
                                            bui.ajax({
                                                url: apiUrl + "/mapi/room/del",
                                                data: {
                                                    mode: mode,
                                                    room_id: roomid,
                                                    checked: checked
                                                },
                                                headers: {
                                                    clientid: "testclient",
                                                    token: islogin
                                                },
                                                method: "POST"
                                            }).then(function(result) {
                                                if (result.code == 0) {
                                                    //roomli.remove();
                                                    gethouse();
                                                } else {
                                                    bui.alert(result.msg);
                                                }
                                            }, function(result, status) {

                                            });
                                        } else if ($(this).text() == "确定" && mode == 2) {
                                            //集中式删除楼层
                                            var floorid = roomli.attr("data_floor");
                                            bui.ajax({
                                                url: apiUrl + "/mapi/rent/rentFloorDel",
                                                data: {
                                                    rent_id: rentid,
                                                    floor_id: floorid,
                                                    checked: checked
                                                },
                                                headers: {
                                                    clientid: "testclient",
                                                    token: islogin
                                                },
                                                method: "post"
                                            }).then(function(result) {
                                                if (result.code == 0) {
                                                    gethouse();
                                                } else {
                                                    bui.alert(result.msg);
                                                }
                                            }, function(result, status) {
                                                //console.log(status)//"timeout"
                                            });
                                        } else if ($(this).text() == "取消") {
                                            menu.close();
                                        }
                                    });
                                    menu.close();
                                }
                            });
                    }
                })
                $("body").on("click", ".fxk", function() {
                    if ($(".fxk").html() == "") {
                        $(".fxk").html("√");
                    } else {
                        $(".fxk").html("");
                    }
                })
            } else {
                bui.alert(result.msg, function(e) {
                    tokenstorage.remove("tokens");
                    window.location.href = domains;
                });
            }
        }, function(result, status) {
            //console.log(status)//"timeout"
        });


    }


    var addhousez = new Vue({
        el: "#houseinfo_app",
        data: housedata,
        methods: {
            gotoyzcontract: function() {
                if (mode == 1) {
                    if (housedata.ownerid == 0) {
                        if(power_rent_owner_add == 1){
                            bui.alert("你没有权限录入");
                            return false;
                        }
                        bui.load({
                            url: "pages/rent/yz_addcontract",
                            param: {
                                rent_id: rentid,
                                htid: 0
                            }
                        });
                    } else {
                        if(power_rent_owner_info == 1){
                            bui.alert("你没有权限查看");
                            return false;
                        }
                        bui.load({
                            url: "pages/rent/yz_contractinfo",
                            param: {
                                rent_id: rentid,
                                htid: housedata.ownerid
                            }
                        });
                    }
                } else if (mode == 2) {
                    if (housedata.ownerid == 0) {
                        if(power_rent_owner_add == 1){
                            bui.alert("你没有权限录入");
                            return false;
                        }
                        bui.load({
                            url: "pages/rent/yz_addcontract",
                            param: {
                                rent_id: rentid,
                                htid: 0
                            }
                        });
                    } else {
                        if(power_rent_owner_info == 1){
                            bui.alert("你没有权限查看");
                            return false;
                        }
                        bui.load({
                            url: "pages/rent/yz_contractlist",
                            param: {
                                rent_id: rentid,
                                htid: housedata.ownerid
                            }
                        });
                    }
                }
            },
            gotofloorroom: function(floorid, floornum, roomnum, housename) {
                if(power_rent_room_edit != 1 || power_rent_room_add !=1){
                bui.load({
                    url: "pages/rent/floor_room.html",
                    param: {
                        floorid: floorid,
                        rentid: rentid,
                        floornum: floornum,
                        roomnum: roomnum,
                        housename: housename
                    }
                });
                }
            },
            houtui: function() {
                router.back({
                    callback: function(mod) {
                        mod.pageview.$options.mounted[0]()
                    }
                })
            }
        },
        mounted: function() {
            gethouse()
        }
    })


    if (mode == 1) {
        var editmeun = [{
            name: "编辑",
            value: "edit"
        }, {
            name: "删除",
            value: "del"
        }, {
            name: "添加房间",
            value: "addrooms"
        }]
    } else {
        var editmeun = [{
            name: "编辑",
            value: "edit"
        }, {
            name: "删除",
            value: "del"
        }, {
            name: "添加楼层",
            value: "addfloor"
        }]
    }
    var uiDialog = bui.dialog({
        id: "#uiDialog",
        height: 200,
        callback: function() {
            if ($(this).html() == "确定") {
                bui.ajax({
                    url: apiUrl + "/mapi/rent/rentFloorManage",
                    data: {
                        id: "",
                        rent_id: rentid,
                        floor: housedata.addfloors,
                        room: housedata.addrooms
                    },
                    headers: {
                        clientid: "testclient",
                        token: islogin
                    },
                    method: "POST"
                }).then(function(result) {
                    if (result.code == 0) {
                        bui.hint({
                            timeout: 2000,
                            autoClose: true,
                            content: "<i class='icon-check'></i><br/>添加成功",
                            position: "center",
                            effect: "fadeInDown",
                            onClose: function() {
                                gethouse();
                            }
                        })
                    } else {
                        bui.alert(result.msg);
                    }
                }, function(result, status) {
                    //console.log(status)//"timeout"
                });
            }
            uiDialog.close();

        }
    });

    var uiActionsheets = bui.actionsheet({
        trigger: "#housebtnopen",
        buttons: editmeun,
        callback: todos
    });
    function todos(e) {
        var val = $(e.target).attr("value");
        if (val == "cancel") {
            uiActionsheets.hide();
        }
        //删除
        if (val == "del") {
            uiActionsheets.hide();
             if(power_rent_del == 1){
                bui.alert("你没有权限删除");
                return false
            }
            bui.confirm({
                title: "",
                content: '<div class="bui-box-center"><p>确认删除该公寓</p><p><em class="fxk">√</em>同时删除已确认账单和流水</p></div>',
                "buttons": [{
                    name: "确定",
                    className: "primary-reverse"
                }, {
                    name: "取消",
                    className: "primary-reverse"
                }]
            }, function(ui) {
                // this 为底部按钮
                 $("body").on("click", ".fxk", function() {
                    if ($(".fxk").html() == "") {
                        $(".fxk").html("√");
                    } else {
                        $(".fxk").html("");
                    }
                })
                var text = $(this).text();
                if (text == "确定") {
                    if ($(".fxk").html() == "") {
                        checked = "0"
                    }
                    bui.ajax({
                        url: apiUrl + "/mapi/rent/del",
                        data: {
                            mode: mode,
                            id: rentid,
                            checked: checked
                        },
                        headers: {
                            clientid: "testclient",
                            token: islogin
                        },
                        method: "POST"
                    }).then(function(result) {
                        uiActionsheets.hide();
                        if (result.code == 0) {
                            bui.hint({
                                timeout: 2000,
                                autoClose: true,
                                content: "<i class='icon-check'></i><br/>删除成功",
                                position: "center",
                                effect: "fadeInDown",
                                //不开启倒计时
                                onClose: function() {
                                    router.back({
                                        callback: function(mod) {
                                            mod.pageview.$options.mounted[0]()
                                        }
                                    })
                                }
                            })
                        } else {
                            bui.alert(result.msg);
                        }
                    }, function(result, status) {
                        //console.log(status)//"timeout"
                    });
                }
                ui.close();
            })
        };

        //编辑
        if (val == "edit") {
            uiActionsheets.hide();
            if(power_rent_edit == 1){
                bui.alert("你没有权限编辑");
                return false;
            }
            router.load({
                url: "pages/rent/addhouse.html",
                param: {
                    id: housedata.houseid,
                    mode: mode
                }
            });
        }
        //添加房间
        if (val == "addrooms") {
             uiActionsheets.hide();
            if(power_rent_room_add == 1){
                bui.alert("你没有权限添加");
                return false
            }
            bui.ajax({
                url: apiUrl + "/mapi/room/add",
                data: {
                    rent_id: rentid,
                    floor_id: "",
                    mode: mode
                },
                headers: {
                    clientid: "testclient",
                    token: islogin
                },
                method: "POST"
            }).then(function(result) {
                if (result.code == 0) {
                    bui.hint({
                        content: "<i class='icon-check'></i><br/>添加成功",
                        position: "center",
                        effect: "fadeInDown",
                        onClose: function() {
                            gethouse()
                        }
                    });
                } else {
                    bui.alert(result.msg);
                }
            }, function(result, status) {
                //console.log(status)//"timeout"
            });
        }
        //添加楼层
        if (val == "addfloor") {
            uiActionsheets.hide();
            if(power_rent_room_add == 1){
                bui.alert("你没有权限添加");
                return false
            }
            uiDialog.open();
        }
    }
    return {
        pageName: "houseinfo",
        pageview: addhousez
    }
})