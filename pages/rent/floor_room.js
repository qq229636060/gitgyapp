loader.define(function(require, exports, module) {
    var islogin = tokenstorage.get("tokens");
    var params = router.getPageParams();
    var rentid = params.rentid;
    var floorid = params.floorid;
    var floornum = params.floornum;
    var roomnum = params.roomnum;
    var housenames = params.housename;
    var modes = mode;
    var listviews;
    var checked = 1;
    var housedatas = {
        mode: mode,
        housenames: housenames,
        houseinfo: [],
        floornum:floornum
    }
    function getfloor() {
        bui.ajax({
            url: apiUrl + "/mapi/rent/rentFloorInfo",
            data: {
                rent_id: rentid,
                floor_id: floorid
            },
            headers: {
                clientid: "testclient",
                token: islogin
            },
            method: "post"
        }).then(function(result) {
            if (result.code == 0) {
                console.log(result);
                housedatas.houseinfo = result.data.roomList;
                addhousez_floor.$nextTick(function() {
                    if(power_rent_room_del == 1){
                        return true
                    }else{
                    listviews && listviews.destroy();
                    listviews = bui.listview({
                        id: "#listviews",
                        data: [{
                            "text": "删除",
                            "classname": "danger"
                        }],
                        menuWidth:80,
                        callback: function(e,ui) {
                             ui.close()
                            var roomli = $(this).parent().parent();
                            bui.confirm({
                                "title": "",
                                "content": '<div class="bui-box-center"><p>确认删除该公寓</p><p><em class="fxk">√</em>同时删除已确认账单和流水</p></div>',
                                "buttons": [{
                                    name: "确定",
                                    className: "primary-reverse"
                                }, {
                                    name: "取消",
                                    className: "primary-reverse"
                                }]
                            }, function() {
                                if ($(this).text() == "确定" && mode == 2) {
                                    var roomid = roomli.attr("data_roomid");
                                    if ($(".fxk").html() == "") {
                                        checked = "0"
                                    }
                                    bui.ajax({
                                        url: apiUrl + "/mapi/room/del",
                                        data: {
                                            mode: 2,
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
                                            getfloor()
                                        } else {
                                            bui.alert(result.msg);
                                        }
                                    }, function(result, status) {

                                    });
                                }
                            })
                        }
                    })}
                })
            } else {
                bui.alert(result.msg);
            }
        }, function(result, status) {
            //console.log(status)//"timeout"
        });
    }
    var addhousez_floor = new Vue({
        el: "#floor_room",
        data: housedatas,
        methods: {
            houtui: function() {
                router.back({
                    callback: function(mod) {
                        mod.pageview.$options.mounted[0]()
                    }
                })
            }
        },
        mounted: function() {
            getfloor()
        }
    });
    $("body").on("click", ".fxk", function() {
        if ($(".fxk").html() == "") {
            $(".fxk").html("√");
        } else {
            $(".fxk").html("");
        }
    })
    var editmeun = [{
        name: "编辑楼层",
        value: "edit"
    }, {
        name: "添加房间",
        value: "addroom"
    }];
    var rightmeun = bui.actionsheet({
        trigger: "#flooropen",
        buttons: editmeun,
        callback: gotos
    });

    function gotos(e) {
        var val = $(e.target).attr("value");
        if (val == "cancel") {
            rightmeun.hide()
        };
        if (val == "edit") {
            rightmeun.hide()
            if(power_rent_room_edit == 1){
                bui.alert("你没有权限编辑");
                return false
            }
            var s = bui.prompt({
                content: "请输入楼层",
                callback: function(ui) {
                    var text = $(this).text();
                    if (text == "确定") {
                        ui.close();
                        if(ui.value() == ''){
                            bui.alert("请填写楼层名");
                            return false;
                        }
                        var vals = parseInt(ui.value());
                        bui.ajax({
                            url: apiUrl + "/mapi/rent/rentFloorManage",
                            data: {
                                id: floorid,
                                rent_id: rentid,
                                floor: vals,
                                room: roomnum
                            },
                            headers: {
                                clientid: "testclient",
                                token: islogin
                            },
                            method: "POST"
                        }).then(function(result) {
                            if (result.code == 0) {
                                rightmeun.hide();
                                bui.alert("修改成功");
                                getfloor()
                            } else {
                                bui.alert(result.msg);
                            }
                        }, function(result, status) {
                            //console.log(status)//"timeout"
                        });
                    }else{
                      ui.close();  
                    }
                }
            });
        };
        //添加房间
        if (val == "addroom") {
             rightmeun.hide();
            if(power_rent_room_add == 1){
                bui.alert("你没有权限添加");
                return false
            }
            bui.ajax({
                url: apiUrl + "/mapi/room/add",
                data: {
                    mode: 2,
                    rent_id: rentid,
                    floor_id: floorid,
                },
                headers: {
                    clientid: "testclient",
                    token: islogin
                },
                method: "POST"
            }).then(function(result) {
                if (result.code == 0) {
                    rightmeun.hide();
                    bui.alert("添加成功", function() {
                        getfloor()
                    });
                } else {
                    bui.alert(result.msg);
                }
            }, function(result, status) {
                //console.log(status)//"timeout"
            });
        }
    }
})