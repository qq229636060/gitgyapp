loader.define(function (require, exports, module) {
    var strs = new Array();
    var strs1 = new Array();
    var params = router.getPageParams();
    var roomid = params.id;
    var htid = params.htid;
    var times = "";
    var islogin = tokenstorage.get("tokens");
    var denglu = function (xhr) {
        xhr.setRequestHeader('token', islogin);
        xhr.setRequestHeader('clientid', 'testclient')
    }
    var otherarr = [];
    var newotherdata = [];
    var payobj;
    var payarr = [];
    var refund = new Vue({
        el: "#refund",
        data: {
            refundhousename: "",
            refundusename: "",
            tel: "",
            btime: "",
            etime: "",
            nowtime:"",
            tztype: "1",
            ifedit: "1",
            zong: "",
            othershow: false,
            zujinnmu:"0",
            yajinnmu:"0",
            retrunpay:"101",
            payinfo:[],
            texts:"",
            datas: {
                "tzutimes": "",
                "zujin": "",
                "yajin": "",
                "jiajian": "0",
                "jiajian1": "0",
                "refundzujin": "",
                "refundyajin": "",
                "tuizudata": [],
            },

        },
        methods: {
            submitrefund: function () {
                    var that = this;
                    var catearr = {}; 
                    var newcate = [];
                    var costarr = {};
    
                    catearr.z = that.datas.jiajian;
                    catearr.y = that.datas.jiajian1;

                    newcate = that.datas.tuizudata;
                    $.each(newcate,function(index){
                        catearr[newcate[index].val] = newcate[index].inputval;
                    })
                    /*获取数值*/
                    costarr.z = that.zujinnmu;
                    costarr.y = that.yajinnmu;
                    $.each(newcate,function(index){
                        costarr[newcate[index].val] = newcate[index].vals;
                    })
                    console.log(catearr)
                    bui.ajax({
                        url: apiUrl+"/mapi/tenant/returnSave",
                        data: {
                            room_id: roomid,
                            id: htid,
                            type:that.tztype,
                            return_time:that.nowtime,
                             reason:that.texts,
                             cate:catearr,
                             cost:costarr
                            // pay_way:that.retrunpay
                        },
                        beforeSend:denglu,
                        method: "POST"
                    }).then(function (result) {
                        if (result.code == 0) {
                             bui.alert("成功退租",function(){
                                     router.back({
                                              callback: function(mod){
                                                mod.pageview.$options.mounted[0]();
                                                }
                                        })
                             });
                        } else {
                            bui.alert(result.msg);
                        }
                    }, function (result, status) {
                        //console.log(status)//"timeout"
                    });
                },
                call: function () {
                    var tels = this.tel;
                    bui.unit.tel(tels);
                },
             
                changeType1: function (e) {
                    var kk = this.datas.jiajian1;
                    if(kk == 0){
                        this.yajinnmu = "0";
                        $("#inputsz").attr("disabled","disabled");
                    }else if(kk == 1){
                        //alert("a")
                        $("#inputsz").removeAttr("disabled");
                    }else if(kk == 2){
                        this.yajinnmu = this.datas.yajin
                        $("#inputsz").attr("disabled","disabled");
                    }
                    
                },
        },
        watch: {
            tztype(val) {
                if (val == 1) {
                    this.ifedit = "1"
                } else {
                    this.ifedit = "0"
                }
            }
        },
        mounted: function () {
            var that = this;
            bui.ajax({
                url: apiUrl + "/mapi/tenant/info",
                data: {
                    room_id: roomid,
                    id: htid
                },
                beforeSend: denglu,
                method: "POST"
            }).then(function (result) {
                console.log(result)
                if (result.code == 0) {
                    that.refundhousename = result.data.room.title;
                    that.refundusename = result.data.tenant.name;
                    that.tel = result.data.tenant.mobile;
                    that.btime = result.data.tenant.start_time;
                    that.etime = result.data.tenant.end_time;
                    that.nowtime = result.data.tenant.end_time;
                    that.datas.zujin = result.data.tenant.rent;
                    that.datas.yajin = result.data.tenant.deposit;
                    payobj = result.data.config.payWay;
                    for(var p in payobj){
                        payarr.push({val:p,name:payobj[p]})
                    }
                    that.payinfo = payarr;
                    times = (result.data.tenant.end_time).replace(/-/g, '/');
                    otherarr = result.data.config.sundryCollect;
                    for (var i in otherarr) {
                        newotherdata.push({
                            name: otherarr[i],
                            value: i
                        })
                    }
                    $("#datepicker_input1").val(that.nowtime)
                    var inputs = $("#datepicker_input");
                    var uiPickerdate = bui.pickerdate({
                        value: times,
                        handle: "#datepicker_input",
                        formatValue: "yyyy-MM-dd",
                        rotateEffect: true,
                        cols: {
                            hour: "none",
                            minute: "none",
                            second: "none"
                        },
                        onChange: function (value) {
                            inputs.val(value);
                            that.nowtime = value;
                        }
                    });




                    $("#addrefundmoney").on("click", function () {
                        uiSelect.show();
                    })
                    var uiSelect = bui.select({
                        title: "请选择扣款",
                        type: "checkbox",
                        height: "500",
                        data: newotherdata,
                        //如果需要点击再进行操作,增加按钮
                        buttons: [{
                            name: "重置",
                            className: ""
                        }, {
                            name: "确定",
                            className: "primary-reverse"
                        }],
                        callback: function (e) {
                                var str = uiSelect.text();
                                var str1 = uiSelect.value();
                                var newarr = [];
                                strs = str.split(",");
                                strs1 = str1.split(",");
                                //console.log(strs)
                                for (var i in strs) {
                                    var obj = {};
                                    obj.names = strs[i];
                                    obj.val = strs1[i];
                                    obj.inputval = "0";
                                    newarr.push(obj)
                                }
                                if (str == "") {
                                    that.othershow = false
                                } else {
                                    //console.log("b")
                                    that.othershow = true
                                    that.datas.tuizudata = strs;
                                }
                                that.datas.tuizudata = newarr
                                var index = $(this).parent().index();
                                if (index == 0) {
                                    uiSelect.selectNone();
                                } else {
                                    uiSelect.hide();
                                }
                            },
                            onChange: function (argument) {
                                //console.log(argument)
                            }
                    });
                } else {
                    bui.alert(result.msg);
                }
            }, function (result, status) {
                //console.log(status)//"timeout"
            });



        }

    })

})