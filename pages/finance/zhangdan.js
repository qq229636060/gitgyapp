loader.define(function (require, exports, module) {
    var islogin = tokenstorage.get("tokens");
    mode = router.getPageParams().mode;
    var status = router.getPageParams().status;
    var zuyuetype = [];
    var htstyle = [];
    var htobject = [];
    var houselists = [];
    var yezhu = [];
    var moneydata = {
        zuyuetype: [],
        htstyle: [],
        yezhu:[],
        htobject: [],
        clist: [],
        yezhuid:"",
        revenue: "",
        rentid: "",
        payway: "",
        s_stimes: "",
        s_etimes: "",
        show: 5,
        now: '-1',
        now1: '-1',
        now2: '-1',
        btnshow: ''
    };
    var uiListcontract;
    function postdata(p) {
        if(p == undefined){
           var tenant_id = router.getPageParams().tenantid;
           var owner_id = router.getPageParams().owner_id; 
        }else{
            var tenant_id ="";
            var owner_id = ""
        }
        
        moneydata.clist = [];
        uiListcontract && uiListcontract.destroy();
        if(moneydata.s_stimes !=""&&moneydata.s_etimes !=""){
            var timeso = moneydata.s_stimes+' ~ '+moneydata.s_etimes
        }else{
            var timeso = ""
        }
        if(status == 1){
            moneydata.payway = 5;
            //moneydata.yezhuid = 1;
            var money_type = router.getPageParams().money_type;
            status = "";
            tenant_id="";
            owner_id="";
        }else if(status == 2){
            moneydata.payway = 5;
            //moneydata.yezhuid = 2;
            var money_type = router.getPageParams().money_type;
            status = "";
            tenant_id="";
            owner_id="";
        }
        uiListcontract = bui.list({
            id: "#scrollcontract",
            url: apiUrl + "/mapi/bill/list",
            method: "POST",
            headers: {
                clientid:"testclient",
                token: islogin
            },
            page: 1,
            pageSize: 20,
            data: {
                mode:mode,
                time:timeso,
                trader:moneydata.yezhuid,
                status:moneydata.payway,
                rent_id:moneydata.rentid,
                tenant_id:tenant_id,
                owner_id:owner_id,
                money_type:money_type
            },
            autoScroll: true,
            refresh: false,
            //如果分页的字段名不一样,通过field重新定义
            field: {
                page: "page",
                data: "data.flowList"
            },
            onLoad: function onLoad(scroll, data) {
                tenant_id = "";
                owner_id ="";
                if (data.code == 0) {
                    for (var i = 0; i < data.data.flowList.length; i++) {
                        moneydata.clist.push(data.data.flowList[i]);
                    }
                }else {
                    bui.alert(res.msg);
                   // bui.alert(data.msg);
                }
            },
            callback: function callback(e) {
                // 点击整行的时候执行
            }
        });
    }
    var zhangdanlist = new Vue({
        el: "#zhangdan",
        data: moneydata,
        methods: {
            navs: function navs(indexs) {
                if (moneydata.show < 4) {
                    moneydata.show = 5;
                } else {
                    moneydata.show = indexs;
                }
            },
            overselcet: function overselcet(indexs, text, now, ids) {
                $(".k" + indexs).html(text);
                moneydata.show = 5;
                if (indexs == '1') {
                    moneydata.now = now;
                    moneydata.rentid = ids;
                } else if (indexs == '2') {
                    moneydata.now1 = now;
                    moneydata.payway = ids;
                } else {
                    moneydata.now2 = now;
                    moneydata.yezhuid = ids
                }
                postdata(0);
            },
            hoverinfo: function hoverinfo(e,zt,tenantid,ownerid,cate) {
                router.load({ url:"pages/finance/zhangdaninfo.html", param: { id:e,zhuantai:zt,tenantid:tenantid,ownerid:ownerid,cate:cate} });
            }

        },
        mounted: function mounted() {
            postdata();
        }
    });
    bui.ajax({
        url: apiUrl + "/mapi/bill/statusList",
        method: "POST",
        headers: {
            clientid: "testclient",
            token:islogin
        },
        data: {
            mode:mode
        }
    }).then(function (res) {
        if(res.code == 0){
            if(mode == 1){
                for (var k in res.data.rentList) {
                    zuyuetype.push({name:res.data.rentList[k].cell_name,ids:res.data.rentList[k].id});
                }
            }else{
                for (var k in res.data.rentList) {
                    zuyuetype.push({name:res.data.rentList[k].apartment,ids:res.data.rentList[k].id});
                }
            }
            for (var k in res.data.billStatus) {
                htstyle.push({name:res.data.billStatus[k],ids:k});
            }
            for (var k in res.data.trader) {
                yezhu.push({name:res.data.trader[k],ids:k});
            }
            moneydata.yezhu = yezhu;
            moneydata.zuyuetype = zuyuetype;
            moneydata.htstyle = htstyle;
         }else{
             bui.alert(res.msg);
         }
        // moneydata.htobject = htobject;
    }, function (res, status) {
        alert(status);
    });
    var datePrevVal;
    var datePrevVal1;
    var myDate = new Date();
    var yue = parseInt(myDate.getMonth()) + 1;
    var begintime = myDate.getFullYear() + '-' + yue + '-' + myDate.getDate();
    $("#starttimes").val("开始时间");
    $("#endtimes").val("结束时间");
    var kstime = bui.pickerdate({
        handle: "#starttimes",
        min: '2015-08-10',
        max: begintime,
        formatValue: "yyyy-MM-dd",
        cols: {
            hour: "none",
            minute: "none",
            second: "none"
        },
        // 如果需要按钮,需要自己写callback
        buttons: ["取消", "确定"],
        callback: function callback() {
            // 取消返回上一个值
            if ($(this).text().trim() == "取消") {
                kstime.value(datePrevVal);
            } else {
                $("#starttimes").val(kstime.value());
                moneydata.s_stimes = kstime.value();
                postdata();
            }
        }
    });
    datePrevVal = kstime.value();
    var jstime = bui.pickerdate({
        // id: "#datepicker_contanier",
        handle: "#endtimes",
        min: '2015-08-10',
        formatValue: "yyyy-MM-dd",
        max: begintime,
        cols: {
            hour: "none",
            minute: "none",
            second: "none"
        },
        // 如果需要按钮,需要自己写callback
        buttons: ["取消", "确定"],
        callback: function callback() {
            // 取消返回上一个值
            if ($(this).text().trim() == "取消") {
                jstime.value(datePrevVal);
            } else {
                var kt = new Date(kstime.value().replace(/\-/g, "\/"));
                var et = new Date(jstime.value().replace(/\-/g, "\/"));
                if (kt < et) {
                    $("#endtimes").val(jstime.value());
                    moneydata.s_etimes = jstime.value();
                    postdata();
                }
            }
        }
    });
     datePrevVal1 = jstime.value();
    return {
        pageName: "zhangdanlist",
        pageview: zhangdanlist
    };
});