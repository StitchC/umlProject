//jquery 1.9.1模块不符合 AMD 格式所以需要自定义
require.config({
	shim:{
		'jquery.min':{
			exports: '$'
		}
	}

})
require(["jquery.min","CheckInput","overborwserEvent"],function main($,checkBy,EventUntil){
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


	function inputFocusHandler(){
		var inputs = ss("#regist-form input");
		for (var i = 0; i < inputs.length; i++) {
			EventUntil.addHandler(inputs[i],"focus",function(){
				checkBy.onFocus(this,"#66CCCC");
			})
		}
	}

	function inputOnBlur(){
		var inputs = ss("#regist-form input");

		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].id == "confirmpwd") {
				//如果输入框id 为 confirmpwd
				//执行与同辈元素匹配事件
				EventUntil.addHandler(inputs[i],"blur",function(){
					checkBy.sibling(this,"pwd","span","#009966","#FF0033");
				});

			}else if(inputs[i].id == "pwd"){
				EventUntil.addHandler(inputs[i],"blur",function(){
					checkBy.reg(this,"span","#009966","#FF0033");
				});

			}else{
				EventUntil.addHandler(inputs[i],"blur",function(){
					//如果通过正则表达式验证正确
					if (checkBy.reg(this,"span","#009966","#FF0033") == true) {

						//对每一个不同输入框连接到不同的后台页面进行认证
						if (this.id == "name") {
							// 那就发送ajax 到指定的地址查询后台是否存在
							checkBy.ajax({	
								elem: this,
								hintsContent: "span",
								errorColor: "#FF0033",
								url: "/umlProject/php/checkUsername.php",
								reqData: "inputVal=" + this.value,
								correctBool: "notExist",
								errorBool: "exist",
								result: "inputStatus"
							});
						}else if(this.id == "account"){
							// 那就发送ajax 查询后台是否存在
							checkBy.ajax({	
								elem: this,
								hintsContent: "span",
								errorColor: "#FF0033",
								url: "/umlProject/php/checkAccount.php",
								reqData: "inputVal=" + this.value,
								correctBool: "notExist",
								errorBool: "exist",
								result: "inputStatus"
							});
						}else if (this.id == "mail") {
							checkBy.ajax({	
								elem: this,
								hintsContent: "span",
								errorColor: "#FF0033",
								url: "/umlProject/php/checkMail.php",
								reqData: "inputVal=" + this.value,
								correctBool: "notExist",
								errorBool: "exist",
								result: "inputStatus"
							});
						}
					}
				})
			}
		}
	}

	function submitEvent(){
		var btn = s("#regist-btn");
		var inputs = ss("#regist-form input");
		var count = 0;


		EventUntil.addHandler(btn,"click",function(event){

			for (var i = 0; i < inputs.length; i++) {

				inputs[i].focus();
				inputs[i].blur();
				if (inputs[i].isCorrect == true) {
					count++;
				}
				
			}

			if (count == inputs.length) {
				this.disabled = "true";
				this.style.backgroundColor = '#ccc';

				console.log($("#regist-form").serialize());

				$.ajax({
					url: '/umlProject/php/registInfo.php',
					type: 'POST',
					dataType: 'json',
					data: $("#regist-form").serialize(),
					success: function(data){

						if (data.result == "success") {
							alert("注册成功");
							window.location.href = "login.html";
						}else{
							alert("注册失败，请检查你的网络");
						}
						
					}
				})
				//重新设定 count 值
				count = 0;
				
			}else{
				//重新设定 count 值
				count = 0;
				alert("部分信息错误，请重新填写后提交");

			}
		})
	}




	//初始化验证信息
	checkBy.init({
		name: {reg: /^[\u4E00-\u9FA5\uF900-\uFA2D\w]{1,16}$/, correct: "输入正确",
		 error: "输入不正确", ajaxError: "此用户名已被注册"},

		account: {reg: /^[\w\d]{8,11}$/, correct: "输入正确", 
		error: "输入不正确", ajaxError: "此帐号已被注册"},

		pwd: {reg: /^[\d\w.]{8,16}$/, correct: "输入正确", 
		error: "输入不正确"},

		confirmpwd: {correct: "密码一致", error: "密码不一致"},

		mail: {reg: /^([\d\w]+[_|\_|\.]?)*[\d\w]+@([\d\w]+[_|\_|\.]?)*[\d\w]+\.[\w]{2,3}/,
		correct: "输入正确", error: "输入不正确", ajaxError: "此邮箱已被注册"}

	});

	inputFocusHandler();
	inputOnBlur();
	submitEvent();
	
});