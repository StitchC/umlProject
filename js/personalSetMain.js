//jquery 1.9.1模块不符合 AMD 格式所以需要自定义
require.config({
	shim:{
		'jquery.min':{
			exports: '$'
		},

		'bootstrap.min':{
			deps: ['jquery.min']
		},

		'fileinput.min':{
			deps: ['jquery.min','bootstrap.min']

		},

		'fileinput_locale_es':{
			deps: ['jquery.min','bootstrap.min','fileinput.min']
		},

		'fileinput_locale_zh':{
			deps: ['jquery.min','bootstrap.min','fileinput.min','fileinput_locale_es']
		}

	}

})
require(["jquery.min", "OverborwserEvent","bootstrap.min","fileinput.min","fileinput_locale_es","fileinput_locale_zh"],function main($,EventUntil){


	//输出用户信息方法
	function outputUserInfo(data){
		var result = JSON.parse(data);
		//初始化头像
		$("#user-header").attr("src",result.headimg);

		//初始化右侧信息
		$("#account-info").val(result.account);
		$("#email-info").val(result.email);
		$("#password-info").val(result.password);
		$("#phonenum-info").val(result.mobilephone);

	}

	//初始化页面方法
	function initPage(){
		//获取用户名
		var name = localStorage.getItem("markername");
		//初始化用户信息
		$.ajax({
			url: '/umlProject/php/outputUserSetPage.php',
			type: 'GET',
			dataType: 'json',
			data: "username=" + name,
			success: function(data){

				outputUserInfo(data);
			}
		})
		

	}





	initPage();


	//定义全局变量 保存头像在服务器的位置
	var userHeadImgSrc = "";

	$('#fileupload').fileinput({
                language: 'zh', //设置语言
                uploadUrl: "/umlProject/php/receiveHeaderImg.php", //上传的地址
                allowedFileExtensions : ['jpg','png'],//接收的文件后缀,
                maxFileCount: 1,
                enctype: 'multipart/form-data',
                showUpload: true, //是否显示上传按钮
                showCaption: false,//是否显示标题
                browseClass: "btn btn-primary", //按钮样式             
                previewFileIcon: "<i class='glyphicon glyphicon-king'></i>", 
                msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",

            }).on("fileuploaded", function(event, data) {

			       userHeadImgSrc = data.response.message;

		    });


    $("#submit-handerimg").click(function(){

    	if (userHeadImgSrc == "") {

    		alert("你还没有选择图片哦！");

    	}else{
    		var name = localStorage.getItem("markername");

	    	$.ajax({
	    		url: '/umlProject/php/saveUserHaderImg.php',
	    		type: 'POST',
	    		dataType: 'json',
	    		data: "username=" + name + "&src=" + userHeadImgSrc,
	    		success: function(data){

	    			if (data.status == "success") {
	    				$("#user-header").attr("src",userHeadImgSrc);
	    				alert("更改成功");
	    			}else{
	    				alert("更改失败！");
	    			}

	    		}
	    	})
    	}
    	
    	
    })


});