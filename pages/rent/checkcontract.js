loader.define(function(require, exports, module) {
	var yulan = new Vue({
		el:"#previewapp",
		data() {
        	return{
        		msg:[{
        			Id:"35010319801201915",
        			hetong:"0",
        			hnames:"保利香饼国际",
        			idpic:"",
        			name:"乐乐",
        			others:[{"name":"电费","valinput":"100"},{"name":"水费","valinput":"100"}],
        			payfunction:"月付",
        			rentsday:"0",
        			rentstype:"提前日收租",
        			tel:"13489118120",
        			timee:"2018-07-24",
        			times:"2018-07-24",
        			yajin:"200",
        			zujin:"100",
        		}]	
        	}
    	},
		mounted:function(){
		   this.$nextTick(function(){
		   	  var uiSlide = bui.slide({
		      id:"#uiSlide",
		      alignClassName:"bui-box-align-middle",
		      width:800,
		      height:600,
		      zoom: true
		 	 })
		   })
			var uiActionsheet = bui.actionsheet({
				trigger: "#btnOpen",
				buttons: [{ name:"编辑",value:"edit" },{ name:"删除",value:"del" }],
				callback: todo
		})
		function todo(e) {
				var val = $(e.target).attr("value");
				console.log(val);
				if( val == "edit"){
						uiActionsheet.hide();
						bui.load({ url: "pages/rent/addcontract.html", replace:false });
				}
		}
		   
		}

	})

})