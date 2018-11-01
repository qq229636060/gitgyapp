"use strict";

loader.define(function (require, exports, module) {
    var num = -1;
    var num1 = -1;
    var idpic = [];
    var idpic1 = [];
    var delimg = []; //删除图片ID
    var params = router.getPageParams();
    var count = params.up1;
    var count2 = params.up2;
    var storagepic1 = bui.storage();
    var storagepic2 = bui.storage();
    var pic1num = storagepic1.get("urlpic1");
    var pic2num = storagepic2.get("urlpic2");
    var islogin = tokenstorage.get("tokens");
    if (pic1num != "") {
        var left = parseInt(count) - parseInt(pic1num[0].length);
        for (var i = 0; i < pic1num[0].length; i++) {
            var html = '<div class="file-item thumbnail" picid="' + pic1num[0][i].id + '">' + '<img src="' + pic1num[0][i].img + '">' + '<i class="close_photo"></i>' + '</div>';
            $('#fileList').append(html);
        }
    } else {
        var left = parseInt(count);
    }

    //合同附件
    if (pic2num != "") {
        var left2 = count2 - pic2num[0].length;
        for (var p = 0; p < pic2num[0].length; p++) {
            var html1 = '<div class="file-item thumbnail" picid="' + pic2num[0][p].id + '">' + '<img src="' + pic2num[0][p].img + '">' + '<i class="close_photo"></i>' + '</div>';
            $('#fileList1').append(html1);
        }
    } else {
        var left2 = count2;
    }

    var atter = new Vue({
        el: "#atter",
        data: {},
        methods: {},
        mounted: function mounted() {
            $("#savehousepic").on("click", function () {
                var j = 0;
                var j1 = 0;
                var doms = $("#fileList .file-item");
                var doms1 = $("#fileList1 .file-item");
                var len1 = doms.length;
                var len2 = doms1.length;
                for (var k = 0; k < len1; k++) {
                    if (doms.eq(k).attr("picid")) {} else {
                        idpic[j] = $("#fileList .file-item").eq(k).attr("bigdata");
                        j++;
                    }
                }
                for (var l = 0; l < len2; l++) {
                    if (doms1.eq(l).attr("picid")) {} else {
                        idpic1[j1] = $("#fileList1 .file-item").eq(l).attr("bigdata");
                        j1++;
                    }
                }
                var storageimg1 = bui.storage();
                var storageimg2 = bui.storage();
                var storagedelimg1 = bui.storage();
                storageimg1.set("pics", idpic);
                storageimg2.set("pics1", idpic1);
                storagedelimg1.set("delpics", delimg);
                router.back({
                    callback: function callback(mod) {
                        mod.idpic = idpic;
                        mod.idpic1 = idpic1;
                        //mod.atter = idpic1;
                    }
                });
            });

            var uploader = WebUploader.create({
                auto: true,
                server: apiUrl + "/mapi/upload/img",
                formData: { 'case': 'tenant' },
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
                        var html = '<div id="' + file.id + '" class="file-item thumbnail" bigdata="' + res.data.url + '">' + '<img src="' + res.data.thumbs['.200x150'] + '">' + '<i class="close_photo"></i>' + '</div>';
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
            $('#fileList').on('click', '.close_photo', function () {
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

            /*-----------------合同附件的--------------------------*/
            var uploader2 = WebUploader.create({
                auto: true,
                server: apiUrl + "/mapi/upload/img",
                formData: { 'case': 'tenant' },
                pick: {
                    id: '#filePicker1',
                    multiple: true
                },
                accept: {
                    title: 'Images',
                    extensions: 'jpg,jpeg,png',
                    mimeTypes: 'image/*'
                },
                threads: 1,
                fileNumLimit: left2,
                fileSingleSizeLimit: 6 * 1024 * 1024
            });
            uploader2.on('uploadBeforeSend', function (obj, data, headers) {
                headers.token = islogin;
                headers.clientid = 'testclient';
            });
            uploader2.on('uploadSuccess', function (file, res) {
                if (left2) {
                    if (res && 'code' in res && res.code === 0) {
                        var html = '<div id="' + file.id + '" class="file-item thumbnail" bigdata="' + res.data.url + '">' + '<img src="' + res.data.thumbs['.200x150'] + '">' + '<i class="close_photo"></i>' + '</div>';
                        $('#fileList1').append(html);
                        --left2;
                    } else {
                        bui.alert(res.msg);
                        uploader.reset();
                    }
                }
            });
            uploader2.on("error", function (type) {
                var msg = '';
                if (type == "Q_TYPE_DENIED") {
                    msg = '请上传jpg,jpeg,png格式的图片!';
                } else if (type == "F_EXCEED_SIZE") {
                    msg = '文件大小不能超过6M!';
                } else if (type == "Q_EXCEED_NUM_LIMIT") {
                    msg = '最多只能上传' + count2 + '张图片!';
                } else if (type == "F_DUPLICATE") {
                    msg = '请不要上传重复图片!';
                }
                if (msg) {
                    bui.alert(msg);
                }
            });
            $('#fileList1').on('click', '.close_photo', function () {
                var id = $(this).parent().attr('id');
                var picid = $(this).parent().attr('picid');
                if (picid) {
                    delimg.push(picid);
                };
                left2++;
                $(this).parent().remove();
                $('#upload2').show();
                uploader2.option('fileNumLimit', left2);
                uploader2.refresh();
                uploader2.reset();
                return false;
            });
        }
    });
});