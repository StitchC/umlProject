require.config({
	shim:{
		'jquery.min':{
			exports: '$'
		},

		'bootstrap.min':{
			deps: ['jquery.min']
		}
	}

})
require(["jquery.min", "OverborwserEvent","bootstrap.min"],function main($,EventUntil){
	
	function s(elem){
		return document.querySelector(elem);
	}

	function ss(elem){
		return document.querySelectorAll(elem);
	}


	EventUntil.addHandler(s("#menu-btn"),"click",function(){
		if (s("#down-menu").style.display == undefined || s("#down-menu").style.display == "none") {
			
			s("#down-menu").style.display = 'block';
		}else{
			
			s("#down-menu").style.display = 'none';
		}
	})

	EventUntil.addHandler(document,"click",function(){
		s("#down-menu").style.display = 'none';
	})

	EventUntil.addHandler(s("#menu-btn"),"touchend",function(){
		s("#down-menu").click();
	})

	console.log(s("#menu-btn").style.display);
});