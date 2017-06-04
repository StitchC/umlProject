//jquery 1.9.1模块不符合 AMD 格式所以需要自定义
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
require(["jquery.min","OverborwserEvent","bootstrap.min"],function main($,EventUntil){

	//封装选择器函数
	function s(name){
		if (name.substring(0, 1) == "#") {
			return document.querySelector(name);
		}else if (name.substring(0, 1) == ".") {
			return document.querySelectorAll(name);
		}else{
			return document.querySelectorAll(name);
		}
	}

	//封装选择多个dom元素 选择器
	function ss(name){
		return document.querySelectorAll(name);
	}

	//封装去除空格函数
	function myTrim(x) {
    	return x.replace(/^\s+|\s+$/gm,'');
	}

	//封装登陆按钮点击事件
	function loginClick(){

		//如果账号和输入框不为空 发送ajax 给后台验证账户是否存在
		if (s("#useraccount").value != "" && s("#userpwd").value != "") {

			$.ajax({
				url: '/umlProject/php/loginCheck.php',
				type: 'POST',
				async: false,
				dataType: 'json',
				data: 'username=' + s("#useraccount").value + '&userpwd=' + s("#userpwd").value,
				success: function(data){
					//data 返回一个 status 键值
					//如果 status == correct 即密码账号正确 随机返回一个匹配账户的用户名 username
					//如果 status == error 即密码或账号错误 随即读取 errorText 里面的内容

					//如果账号密码正确
					if (data.status == "correct") {
						//保存用户名 跳转到另一页面的时候读取
						localStorage.setItem("markername", data.username);
						console.log(localStorage.getItem("markername"));
						//跳转页面
						window.location.href = "personalPage.html";
					}else{

						s("#login-hint").style.color = "#FF0033";
						s("#login-hint").innerText = data.errorText;
					}
				}
			})
			
		}else{
			s("#login-hint").style.color = "#FF0033";
			s("#login-hint").innerText = "账号或密码不能为空！";
		}
	}

	EventUntil.addHandler(s("#login-btn"),"click",loginClick);

});