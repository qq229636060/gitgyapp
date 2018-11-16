loader.define(function (require, exports, module){
	var num =-1;
	var num1 =-1;
    var idpic = [];
    var idpic1 = [];
    var addhousez = new Vue({
        el:"#atter",
        data:{

        },
        methods:{

        },
        mounted:function(){
        	$("#saveroom").on("click",function(){
        		 var storageroom = bui.storage();
       				storageroom.set("roompic",idpic);
					router.back({
				    callback: function(mod){
				    	console.log(mod);
				    }
				})
			})
        	var uploader = WebUploader.create({
				// 选完文件后，是否自动上传。
				//auto: false,
				// 文件接收服务端。
				server: '',
				// 选择文件的按钮。可选。
				// 内部根据当前运行是创建，可能是input元素，也可能是flash.
				pick: '#filePicker',
				// 只允许选择图片文件。
				accept: {
					title: 'Images',
					extensions: 'gif,jpg,jpeg,bmp,png',
					mimeTypes: 'image/*',
					quality:70,
				},
				threads:1,
				fileNumLimit:5,
		        fileSingleSizeLimit:2211840
			});
			uploader.on('fileQueued',function( file ) {
				console.log(file)
				num++;
			    var $li = $(
			            '<div id="' + file.id + '" class="file-item thumbnail" data-id="'+num+'">' +
			                '<img>' +
			                '<i class="close_photo"></i>'+
			            '</div>'
			            ),
			        $img = $li.find('img');
			    // $list为容器jQuery实例
			    $("#fileList").prepend($li);

			    // 创建缩略图
			    // 如果为非图片文件，可以不用调用此方法。
			    // thumbnailWidth x thumbnailHeight 为 100 x 100
			    var thumbnailWidth = 100;
			    var thumbnailHeight = 100;
			    uploader.makeThumb( file, function( error, src ) {
			        if ( error ) {
			            $img.replaceWith('<span>不能预览</span>');
			            return;
			        }
			        idpic.push(src) ;
			        $img.attr( 'src', src );
			    }, thumbnailWidth, thumbnailHeight );
			});
			uploader.on("error", function (type) {
				var msg = '';
				if (type == "Q_TYPE_DENIED") {
		            msg = '请上传jpg,jpeg,png格式的图片!';
		        } else if (type == "F_EXCEED_SIZE") {
		            msg = '文件大小不能超过2M!';
		        }else if(type== "Q_EXCEED_NUM_LIMIT"){
		            msg = '最多只能上传'+5+'张图片!';
		        }else if(type== "F_DUPLICATE"){
		            msg = '请不要上传重复图片!';
		        }
		        bui.alert(msg)
			})
			$('#fileList').on('click','.close_photo',function(){
	        $(this).parent().remove();
	        var  arrnum = $(this).parent().attr("data-id");
	        idpic.splice(arrnum,1);
	        console.log(idpic)
	        uploader.reset();
	        return false;
	   	  });
        }
    })
})