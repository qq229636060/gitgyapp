loader.define(function (require, exports, module){
    var params = router.getPageParams();
    var roomid = params.roomid;
    var islogin = tokenstorage.get("tokens");
    var supply = [];
    var tagarr = [];
    var pztag ="";
    var pztxt ="";
    var tagval ="";
    var tagtext ="";
    var arrid = [];
    var editpicarr = [];
    var storage = bui.storage();
    var left = 10;
    var count = 10;
    var covers;
    var cover_new = [];
    var tmpcover;
    var delimg = [];
    var special_toilet,special_window,special_balcony = 0;
    var addrooms = new Vue({
        el:"#addroom_app",
        data:{
            picarr:[],
            delimg:"",
            cover:"",
            covernew:[],
            first:"",
            oldpic:"",
            datafrom:{
              roomname:"",
              type1:"",
              type2:"",
              type3:"",
              area:"",
              direction:"",
              directionlist:[],
              zhuanxiu:"-1",
              zhuanxiulist:[],
              years:"",
              dianti:"-1",
              floors:"",
              zfloors:"",
              yajin:"-1",
              yajinlist:[],
              zhujin:"",
              miaosu:"",
              roomnum:"",
              arrpz:[],
              tagarr:[],
              special_toilet:"",
              special_window:"",
              special_balcony:""
            }
        },
        methods:{
               houtui:function(){
                router.back({
                    callback:function(mod) {
                        mod.pageview.$options.mounted[0]()
                    }
               })
            },
            submitroom:function(pushnum){
                var that = this;
                that.delimg = delimg;
                that.picarr = [];
                $(".newnew").each(function(idx){
                    if($(".newnew").eq(idx).hasClass("fm")){
                        cover_new[idx] = 1;
                    }else{
                        cover_new[idx] = 0;
                    }
                    that.covernew = cover_new;
                    console.log(covers)
                    that.cover = covers;
                    that.picarr.push($(".newnew").eq(idx).attr("bigdata"))
                })
                if(this.datafrom.roomname == ""){
                    bui.alert("请填写房间名称");
                }else if(this.datafrom.type1 == "" || this.datafrom.type2 == "" || this.datafrom.type3 == ""){
                    bui.alert("请填写户型");
                }else if(this.datafrom.area == ""){
                    bui.alert("请填写房间面积");
                }else if(this.datafrom.zhuanxiu == "-1"){
                    bui.alert("请选择装修情况");
                }else if(this.datafrom.dianti == "-1"){
                    bui.alert("请选择是否有电梯");
                }else if(this.datafrom.floors == ""){
                    bui.alert("请选择楼层");
                }else if(this.datafrom.yajin == "-1"){
                    bui.alert("请选择押付方式");
                }else if(this.datafrom.zhujin == ""){
                    bui.alert("请输入期望租金");
                }else if(this.datafrom.zhujin < 1){
                    bui.alert("租金不能小于1元");
                }else if(this.datafrom.miaosu == ""){
                    bui.alert("请输入房源描述");
                }else if(pushnum == 1 && this.picarr.length == 0 && this.oldpic.length == 0){
                    bui.alert("请上传图片");
                }else{
                  bui.ajax({
                      url: apiUrl + "/mapi/room/edit",
                      data: {
                        id:roomid,
                        push:pushnum,
                        room_no:that.datafrom.roomnum,
                        hx_room:that.datafrom.type1,
                        hx_hall:that.datafrom.type2,
                        hx_toilet:that.datafrom.type3,
                        area:that.datafrom.area,
                        orientation:that.datafrom.direction,
                        decorate:that.datafrom.zhuanxiu,
                        year:that.datafrom.years,
                        money:that.datafrom.zhujin,
                        payment:that.datafrom.yajin,
                        floor:that.datafrom.floors,
                        floor_total:that.datafrom.zfloors,
                        elevator:that.datafrom.dianti,
                        supply:that.datafrom.arrpz,
                        special_toilet:that.datafrom.special_toilet,
                        special_window:that.datafrom.special_window,
                        special_balcony:that.datafrom.special_balcony,
                        old_cover:that.cover,
                        img:that.picarr,
                        cover:that.covernew,
                        intro:that.datafrom.miaosu,
                        del_img:that.delimg,
                        mode:mode
                      },
                      headers: {
                            clientid: "testclient",
                            token: islogin
                        },
                      method: "POST"
                  }).then(function(result){
                      if(result.code == 0){
                        console.log(result)
                        bui.alert("保存成功",function(){
                                router.back({
                                callback: function(mod) {
                                  mod.pageview.$options.mounted[0]()
                                }
                              })
                        });
                    }else{
                        bui.alert(result.msg);
                    } 
                  },function(result,status){
                      //console.log(status)//"timeout"
                  });
                }
            }
        },
        mounted:function(){    
            var that = this;
            bui.ajax({
                url: apiUrl + "/mapi/room/info",
                data: {
                    room_id:roomid,
                    mode:mode
                },
                headers: {
                    clientid: "testclient",
                    token: islogin
                },
                method: "POST"
            }).then(function(result){
                if(result.code == 0){
                    that.datafrom.roomnum = result.data.room.room_no;
                          $.each(result.data.supply,function(index){
                            supply.push({name:result.data.supply[index].name,value:result.data.supply[index].id})
                        })
                        var uiSelect = bui.select({
                                trigger:"#select",
                                title:"请选择配置",
                                type:"checkbox",
                                data:supply,
                                //如果需要点击再进行操作,增加按钮
                                buttons: [{name:"重置",className:""},{name:"确定",className:"primary-reverse"}],
                                callback: function (val) {
                                        console.log(val)
                                        var index = $(this).parent().index();
                                        if( index == 0 ){
                                                uiSelect.selectNone();
                                        }else{
                                                uiSelect.hide();
                                                console.log(uiSelect.value().split(","))
                                                that.datafrom.arrpz = uiSelect.value().split(",");
                                        }
                                },
                                 onChange: function (argument) {
                                        console.log(uiSelect.value())
                                }
                        });
                        
                    that.datafrom.directionlist = result.data.orientation;
                    that.datafrom.zhuanxiulist = result.data.decorate;
                    that.datafrom.yajinlist = result.data.payment;
                    //是否完善信息
                      //that.datafrom.roomname = result.data.room.room_no;
                        that.datafrom.roomname = result.data.room.room_no;
                        that.datafrom.type1 = parseInt(result.data.room.hx_room) ? result.data.room.hx_room :'';
                        that.datafrom.type2 = parseInt(result.data.room.money) ? result.data.room.hx_hall :'';
                        that.datafrom.type3 = parseInt(result.data.room.money)? result.data.room.hx_toilet :'';
                        that.datafrom.area = parseFloat(result.data.room.area)? parseFloat(result.data.room.area):'';
                        that.datafrom.direction =  result.data.room.orientation.id?result.data.room.orientation.id:'-1';
                        that.datafrom.zhuanxiu =  result.data.room.decorate.id?result.data.room.decorate.id:'-1';
                        that.datafrom.years =  parseInt(result.data.room.year) ? result.data.room.year :'';
                        that.datafrom.dianti = result.data.room.elevator? result.data.room.elevator:'-1';
                        that.datafrom.floors = parseInt(result.data.room.floor)? result.data.room.floor:'';
                        that.datafrom.zfloors =parseInt(result.data.room.floor_total) ? result.data.room.floor_total:'';
                        that.datafrom.yajin = result.data.room.payment.id;
                        that.datafrom.zhujin = parseInt(result.data.room.money) ? result.data.room.money:'';
                        that.oldpic = result.data.room.photo.length;
                        that.datafrom.miaosu = result.data.room.intro;
                        $.each(result.data.room.photo, function (idx) {
                            editpicarr.push({ img: result.data.picDomain + result.data.room.photo[idx].img, cover: result.data.room.photo[idx].cover, id: result.data.room.photo[idx].id });
                        });
                        if (editpicarr.length != 0) {
                            var left = parseInt(count) - parseInt(editpicarr.length);
                            for (var i = 0; i < editpicarr.length; i++) {
                                if (editpicarr[i].cover == 1) {
                                    var classfm = "fm";
                                } else {
                                    var classfm = "";
                                }
                                var html = '<div class="file-item thumbnail old ' + classfm + '" picid="' + editpicarr[i].id + '" bigdata="' + editpicarr[i].img + '">' + '<div class="covers">封面</div>' + '<img src="' + editpicarr[i].img + '">' + '<i class="close_photo"></i>' + '</div>';
                                $('#fileList').append(html);
                            }
                        }
                        if(result.data.room.supply){
                             $.each(result.data.room.supply,function(idx){
                             pztag += result.data.room.supply[idx].id+",";
                             pztxt += result.data.room.supply[idx].name+",";
                             arrid.push(result.data.room.supply[idx].id);
                             that.datafrom.arrpz = arrid;
                             uiSelect.value(pztag);
                             uiSelect.text(pztxt);
                        })
                        }else{
                          that.datafrom.arrpz = "";
                        }
                         if(result.data.room.special_toilet == 1){
                            tagval += "1,";
                            tagtext += "独卫,";
                            that.datafrom.special_toilet = 1;
                            };
            
                        if(result.data.room.special_window == 1){
                            tagval += "2,";
                            tagtext += "飘窗,";
                            that.datafrom.special_window = 1;
                        };
                        if(result.data.room.special_balcony == 1){
                            tagval += "3";
                            tagtext += "有阳台";
                            that.datafrom.special_balcony = 1;
                        };



                    var uiSelect1 = bui.select({
                                trigger:"#select1",
                                title:"请选择标签",
                                type:"checkbox",
                                data: [{"name":"独卫",value:'1'},{"name":"有飘窗",value:'2'},{"name":"有阳台",value:'3'}],
                                //如果需要点击再进行操作,增加按钮
                                buttons: [{name:"重置",className:""},{name:"确定",className:"primary-reverse"}],
                                callback: function () {
                                        var index = $(this).parent().index();
                                        if( index == 0 ){
                                                uiSelect1.selectNone();
                                        }else{  
                                                console.log(uiSelect1.value())
                                                that.datafrom.special_toilet = "";
                                                that.datafrom.special_window = "";
                                                that.datafrom.special_balcony = "";
                                                that.datafrom.tagarr = uiSelect1.value().split(",");
                                                uiSelect1.hide();
                                                console.log(that.datafrom.tagarr)
                                                $.each(that.datafrom.tagarr,function(idx){
                                                    if(that.datafrom.tagarr[idx] == 1){
                                                        that.datafrom.special_toilet = "1"
                                                    }else if(that.datafrom.tagarr[idx] == 2){
                                                        that.datafrom.special_window = "1"
                                                    }else if(that.datafrom.tagarr[idx] == 3){
                                                        that.datafrom.special_balcony = "1"
                                                    }
                                                })
                                        }
                                },
                                onChange: function (argument) {
                                       
                                }
                        }); 
                        uiSelect1.value(tagval);
                        uiSelect1.text(tagtext);
                }else{
                    bui.alert(result.msg);
                }

            },function(result,status){
                //console.log(status)//"timeout"
            });

        
        // 上传图片
         var uploader = WebUploader.create({
                auto: true,
                server: apiUrl + "/mapi/upload/img",
                formData: { 'case': 'rent' },
                pick: {
                    id: '#filePicker',
                    multiple: true
                },
                accept: {
                    title: 'Images',
                    extensions: 'jpg,jpeg,png',
                    mimeTypes: 'image/*'
                },
                threads: 1,
                fileNumLimit: left,
                fileSingleSizeLimit: 6 * 1024 * 1024
            });
            uploader.on('uploadBeforeSend', function (obj, data, headers) {
                headers.token = islogin;
                headers.clientid = 'testclient';
            });
            uploader.on('uploadSuccess', function (file, res) {
                if (left) {
                    if (res && 'code' in res && res.code === 0) {
                        var html = '<div id="' + file.id + '" class="file-item thumbnail newnew" bigdata="' + res.data.url + '">' +'<div class="covers">封面</div>'+ '<img src="' + res.data.thumbs['.200x150'] + '">' + '<i class="close_photo"></i>' + '</div>';
                        $('#fileList').append(html);
                        --left;
                    } else {
                        //bui.alert(res.msg);
                        uploader.reset();
                    }
                }
            });
            uploader.on("error", function (type) {
                var msg = '';
                if (type == "Q_TYPE_DENIED") {
                    msg = '请上传jpg,jpeg,png格式的图片!';
                } else if (type == "F_EXCEED_SIZE") {
                    msg = '文件大小不能超过6M!';
                } else if (type == "Q_EXCEED_NUM_LIMIT") {
                    msg = '最多只能上传' + count + '张图片!';
                } else if (type == "F_DUPLICATE") {
                    msg = '请不要上传重复图片!';
                }
                if (msg) {
                    bui.alert(msg);
                }
            });
            $('#fileList').on('click','.close_photo', function () {
                var id = $(this).parent().attr('id');
                var picid = $(this).parent().attr('picid');
                if (picid) {
                    delimg.push(picid);
                };
                left++;
                $(this).parent().remove();
                $('#upload').show();
                uploader.option('fileNumLimit', left);
                uploader.refresh();
                uploader.reset();
                return false;
            });
            $('#fileList').on('click','img', function () {
                $("#fileList .file-item").removeClass("fm");
                $(this).parent().addClass("fm");
                console.log($(this).parent().attr("picid"))
                addrooms._data.cover = $(this).parent().attr("picid");
            });

  
        }
    })
    return{
        pageName:"addroom"
    }
});


