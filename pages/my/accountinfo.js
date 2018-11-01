loader.define(function(require, exports, module) {
	var params = router.getPageParams();
	var c1 = params.c1;
	var c2 = params.c2;
	var c3 = params.c3;
	var c4 = params.c4;
	var c5 = params.c5;
	var c6 = params.c6;
	var c7 = params.c7;
	var c8 = params.c8;
	var c9 = params.c9;
	var ts = params.ts;

	var accountionfos = new Vue({
		el:"#accountinfo",
		data:{
			c1:c1,
			c2:c2,
			c3:c3,
			c4:c4,
			c5:c5,
			c6:c6,
			c7:c7,
			c8:c8,
			c9:c9,
			tsz:""
		},
		methods:{},
		mounted:function(){
			var that = this
			if(ts == 1){
				that.tsz = 1
			}else{
				that.tsz = 2
			}
		}
	})
})