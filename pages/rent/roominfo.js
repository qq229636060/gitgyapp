loader.define(function(require, exports, module) {
  var islogin = tokenstorage.get("tokens");
  var denglu = function(xhr) {
      xhr.setRequestHeader('token', islogin);
      xhr.setRequestHeader('clientid', 'testclient')
    }
  var params = router.getPageParams();
  var roomid = params.id;
  var htid = params.htid;
  var checked = 1;
  var roomsdata = {
      zpicnow:"",
      picnow:"1",
      datafrom: {
        jdpic: [],
        roomname: "",
        type1: "",
        type2: "",
        type3: "",
        area: "",
        direction: "",
        zhuanxiu: "",
        years: "",
        dianti: "",
        floors: "",
        zfloors: "",
        paytype: "",
        zhujin: "",
        miaosu: "",
        tag: [],
        roompz: [],
        nowtag: []
      },
      picdomain: "",
      roomid: "",
      rentid: "",
      btntext:""
    }
  function roomdatas(that){
      bui.ajax({
        url: apiUrl + "/mapi/room/info",
        beforeSend: denglu,
        method: "post",
        data: {
          'room_id': roomid,
          'mode': mode
        },
      }).then(function(result) {
        if (result.code == 0) {
          console.log(result);
          roomsdata.datafrom.roomname = result.data.room.room_name;
          roomsdata.datafrom.type1 = result.data.room.hx_room;
          roomsdata.datafrom.type2 = result.data.room.hx_hall;
          roomsdata.datafrom.type3 = result.data.room.hx_toilet;
          roomsdata.datafrom.area = result.data.room.area;
          roomsdata.datafrom.direction = result.data.room.orientation.name;
          roomsdata.datafrom.zhuanxiu = result.data.room.decorate.name;
          roomsdata.datafrom.years = result.data.room.year;
          roomsdata.datafrom.roompz = result.data.supply;
          roomsdata.roomid = result.data.room.id;
          roomsdata.rentid = result.data.room.rent_id;
          if(result.data.room.tenant_id > 0){
            roomsdata.btntext = result.data.room.tenant_id
          }else{
            roomsdata.btntext = htid
          }
          
          var nowarr = [];
          for (let i in result.data.room.supply) {
            nowarr.push(result.data.room.supply[i])
          }
          var nowarrlen = nowarr.length;
          for (var i = 0; i < roomsdata.datafrom.roompz.length; i++) {
            for (var j = 0; j < nowarrlen; j++) {
              if (nowarr[j].id == roomsdata.datafrom.roompz[i].id) {
                 roomsdata.datafrom.roompz[i].oo = "0"
              }
            }
          }

          roomsdata.datafrom.nowtag = nowarr;
          if (result.data.room.elevator == 1) {
            roomsdata.datafrom.dianti = "有电梯"
          } else {
            roomsdata.datafrom.dianti = "无电梯"
          }
          roomsdata.datafrom.floors = result.data.room.floor;
          roomsdata.datafrom.zfloors = result.data.room.floor_total;
          roomsdata.datafrom.paytype = result.data.room.payment;
          roomsdata.datafrom.zhujin = result.data.room.money;
          if (result.data.room.photo.length == 0) {
            roomsdata.datafrom.jdpic = [{
              img: "../../images/icon/pics.png"
            }];
          } else {
            roomsdata.datafrom.jdpic = result.data.room.photo;
            $.each(result.data.room.photo, function(index) {
              roomsdata.datafrom.jdpic[index].domains = result.data.picDomain
            })
          }
          var tagarr = [];
          if (result.data.room.special_toilet == 1) {
            tagarr.push("独卫")
          }
          if (result.data.room.special_window == 1) {
            tagarr.push("飘窗")
          }
          if (result.data.room.special_balcony == 1) {
            tagarr.push("独阳")
          }
          if (tagarr.length == 0) {
            tagarr.push("无")
          }
          console.log(tagarr)
          roomsdata.datafrom.tag = tagarr;
          roomsdata.datafrom.miaosu = result.data.room.intro.replace(/\n\r/g, '<br/>').replace(/\n/g, '<br/>');
          roomsinfoz.$nextTick(function () {
              var uiSlides = bui.slide({
              id: "#slide1",
              zoom: false,
              autopage:true,
              height: 200
            });
            roomsdata.zpicnow = $(".bui-slide-head li").length;
            uiSlides.on("to",function () {
              roomsdata.picnow = uiSlides.index()+1;
            });
        })
        }else if(result.code == "-86"){
          bui.alert(result.msg,function(){
            bui.back();
          });
        }else{
          bui.alert(result.msg, function(e) {
            tokenstorage.remove("tokens");
            window.location.href = domains;
          });
        }
        //console.log(roomsdata.datafrom.miaosu)
      }, function(result, status) {
        //console.log(status)
      });

   
    }
  var roomsinfoz = new Vue({
    el: "#roominfo_app",
    data:roomsdata ,
    methods: {
      houtui:function(){
                router.back({
                    callback:function(mod) {
                        mod.pageview.$options.mounted[0]()
                    }
               })
            },
      gotoht: function() {
        if(power_rent_tenant_info == 1){
          bui.alert("你没有权限查看");
                return false;
        }
        bui.load({
          url: "pages/rent/contractinfo.html",
          param: {
            id: roomid,
            htid: roomsdata.btntext
          }
        });
      },
      gotoxht: function() {
        if(power_rent_tenant_add == 1){
           bui.alert("你没有权限录入");
              return false;
        }
        bui.load({
          url: "pages/rent/addcontract.html",
          param: {
            id: roomid,
            htid: roomsdata.btntext
          }
        });
      }
    },
    mounted: function(){
      roomdatas(this);
    }
  })
     var uiActionsheet = bui.actionsheet({
        trigger: "#eidtrooms",
        buttons: [{
          name: "编辑房间",
          value: "1"
        }, {
          name: "删除房间",
          value: "2"
        }],
        callback: function(e, ui) {
          var val = $(this).attr("value");
          if (val == "cancel") {
            ui.hide();
          }
          if (val == "1") {
            ui.hide();
             if(power_rent_room_edit == 1){
                    bui.alert("你没有权限编辑");
                    return false;
                }
            bui.load({
              url: "pages/rent/addroom",
              param: {
                roomid: roomsdata.roomid
              }
            });
          }
          if (val == "2") {
            ui.hide();
            if(power_rent_room_del == 1){
                    bui.alert("你没有权限删除");
                    return false;
                }
            bui.confirm({
              "title": "",
              "content": '<div class="bui-box-center"><p>是否删除合同</p><p><em class="fxk">√</em>同时删除已确认账单和流水</p></div>',
              "buttons": [{
                name: "确定",
                className: "primary-reverse"
              }, {
                name: "取消",
                className: "primary-reverse"
              }]
            }, function() {
              if ($(this).text() == "确定") {
                if ($(".fxk").html() == "") {
                  checked = "0"
                }
                bui.ajax({
                  url: apiUrl + "/mapi/room/del",
                  data: {
                    mode: mode,
                    room_id: roomsdata.roomid,
                    checked: checked
                  },
                  headers: {
                    clientid: "testclient",
                    token: islogin
                  },
                  method: "POST"
                }).then(function(result) {
                  if (result.code == 0) {
                    bui.alert(result.msg, function() {
                      router.back({
                        callback: function(mod) {
                          mod.pageview.$options.mounted[0]()
                        }
                      })
                    });
                  } else {
                    bui.alert(result.msg);
                  }
                }, function(result, status) {

                });
              }
            });
          }
          $("body").on("click", ".fxk", function() {
            if ($(".fxk").html() == "") {
              $(".fxk").html("√");
            } else {
              $(".fxk").html("");
            }
          })
        }
      })
 return{
        pageName:"roominfo",
        pageview: roomsinfoz
    }
})