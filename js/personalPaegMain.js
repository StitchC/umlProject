//jquery 1.9.1模块不符合 AMD 格式所以需要自定义
require.config({
	shim:{
		'jquery.min':{
			exports: '$'
		},

		'bootstrap.min':{
			deps: ['jquery.min']
		},

		'summernote.min': {
			deps: ['jquery.min','bootstrap.min']
		},

		'summernote-zh-CN.min': {
			deps: ['summernote.min']
		}
	}

})
require(["jquery.min", "OverborwserEvent","bootstrap.min","summernote.min","summernote-zh-CN.min"],function main($,EventUntil){

	function s(elemname){
		return document.querySelector(elemname);
	}

	function ss(elemname){
		return document.querySelectorAll(elemname);
	}

	function createElem(elemname){
		return document.createElement(elemname);
	}

	//选择图片时把图片上传到服务器再读取服务器指定的存储位置显示在富文本区域内
	function sendFile(files, editor, $editable) {  
        var formdata = new FormData();  
        formdata.append("file", $('.note-image-input')[0].files[0]);  
        $.ajax({  
            data : formdata,  
            type : "POST",  
            url : "/umlProject/php/receiveFile.php", //图片上传出来的url，返回的是图片上传后的路径，http格式  
            cache : false,  
            contentType : false,  
            processData : false,  
            dataType : "json",  
            success: function(data) {
            	//data是返回的hash,key之类的值，key是定义的文件名  
                $('#user-work-content').summernote('insertImage', data.message);  
            },  
            error:function(){  
                alert("上传失败");  
            }  
        });  
    }  


    //个人记录编辑菜单点击事件回调函数
	function editMenuClick(){
		var parent = this.parentNode;
		var rightPos =  window.getComputedStyle(this, null).marginRight;
		var ul = parent.querySelectorAll("ul")[0];

		if (ul.style.display != "block" || ul.style.display == undefined) {

			ul.style.right = rightPos;
			ul.style.display = 'block';

		}else{
			ul.style.display = 'none';
		}
		console.log(rightPos);
	}

	//编辑按钮点击事件回调函数
	function editBtnClick(){
		var parent = this.parentNode.parentNode.parentNode;

		//获取id 值
		var id = parent.querySelectorAll(".person-daily-title")[0].title;


		//发送ajax 请求获取数据
		$.ajax({
			url: '/umlProject/php/edit.php',
			type: 'GET',
			dataType: 'json',
			data: "worksId=" + id,
			success: function(data){
				var result = JSON.parse(data);
				//请求成功将数据输出到弹出层中
				$("#user-workt-title").val(result.title);
				$("#user-workt-title").attr("title",result.id);
				$("#user-work-content").summernote("code",result.content);

				//弹出层显示
				$("#floor").fadeIn(300);
			}
		});

		
		
		
	}


	//删除按钮点击事件回掉函数
	function deleteBtnClikc(){
		var parent = this.parentNode.parentNode.parentNode;

		//获取id 值
		var id = parent.querySelectorAll(".person-daily-title")[0].title;

	
			//发送ajax
			$.ajax({
				url: '/umlProject/php/delete.php',
				type: 'POST',
				dataType: 'json',
				data: "worksId=" + id,
				success: function(data){
					if (data.status == "success") {
						alert("删除成功！");
						var author = localStorage.getItem("markername");
						
						$.ajax({
					 		url: '/umlProject/php/outputContent.php',
					 		type: 'GET',
					 		dataType: 'json',
					 		data: "username=" + author,
					 		success: function(data){
					 			createWorksElem(data);
					 			
					 		}
					 	});
						
					}else{
						alert("删除失败！");
					}
				}
			})
		
	}


    //输出个人记录信息
	function createWorksElem(data){
	 	var frag = document.createDocumentFragment();


	 	for (var i = 0; i < data.length; i++) {
	 		//将每一个数组元素转换为对象
	 		var jsonResult = JSON.parse(data[i]);

	 		var ul = createElem("ul"),
	 			li = createElem("li"),
	 			div = createElem("div"),
	 			span = createElem("span"),
	 			a = createElem("a");


	 		var toolbarDiv = div.cloneNode(),
	 			toolTipIcon = span.cloneNode(),
	 			toolListUl = ul.cloneNode(),
	 			editToolList = li.cloneNode(),
	 			deleteToolList = li.cloneNode(),
	 			editToolIcon = span.cloneNode(),
	 			deleteToolIcon = span.cloneNode();



	 		toolbarDiv.className = "person-daily-toolbar"; //操作菜单栏的包裹层
	 		toolTipIcon.className = "glyphicon glyphicon-menu-hamburger edit-list"; //操作菜单按钮图标
	 		toolListUl.className = "down-menu"; //操作下拉菜单
	 		editToolList.className = "edit-btn"; //编辑按钮
	 		deleteToolList.className = "delete-btn"; //删除按钮
	 		editToolIcon.className = "glyphicon glyphicon-edit"; //编辑按钮图标
	 		deleteToolIcon.className = "glyphicon glyphicon-trash"; //删除按钮图标

	 		//为编辑菜单按钮点击事件绑定函数
	 		EventUntil.addHandler(toolTipIcon,"click",editMenuClick);



	 		editToolList.appendChild(editToolIcon);
	 		editToolIcon.innerText += " 编辑";
	 		deleteToolList.appendChild(deleteToolIcon);
	 		deleteToolIcon.innerText += " 删除";

	 		//为编辑按钮绑定点击事件
	 		EventUntil.addHandler(editToolList,"click",editBtnClick);

	 		//为删除按钮绑定点击事件
	 		EventUntil.addHandler(deleteToolList,"click",deleteBtnClikc);


	 		toolListUl.appendChild(editToolList);
	 		toolListUl.appendChild(deleteToolList);

	 		toolbarDiv.appendChild(toolTipIcon);
	 		toolbarDiv.appendChild(toolListUl);
	 		//最外层li 添加操作栏
	 		li.appendChild(toolbarDiv);
	 		//---------- 操作菜单栏输出完成-------------

	 		var titleDiv = div.cloneNode();
	 		titleDiv.className = "person-daily-title";

	 		if (jsonResult.title != "") {
	 			//如果json 数据的title 不为空
	 			//创建一个a 元素
	 			var title = a.cloneNode();
	 			title.innerText = jsonResult.title;
	 			title.href = "#";
	 			titleDiv.title = jsonResult.id;
	 			titleDiv.appendChild(title);
	 			li.appendChild(titleDiv);

	 		}else{
	 			//如果为空就直接为titleDiv 添加title属性
	 			titleDiv.title = jsonResult.id;

	 			li.appendChild(titleDiv);
	 		}

	 		//--------- 标题栏输出完成 ---------------


	 		var contentDiv = div.cloneNode();
	 		contentDiv.className = "person-daily-content";
	 		contentDiv.innerHTML = jsonResult.content;
	 		li.appendChild(contentDiv);

	 		//----------- 内容输出完成 -----------


	 		var footerDiv = div.cloneNode(),
	 			timeWrap = span.cloneNode(),
	 			timeIcon = span.cloneNode(),
	 			timeContent = span.cloneNode(),
	 			likeWrap = span.cloneNode(),
	 			likeIcon = span.cloneNode(),
	 			likeContent = span.cloneNode();

	 		timeWrap.className = "footer-time";
	 		timeIcon.className = "glyphicon glyphicon-time";
	 		timeContent.className = "publish-time";
	 		timeContent.innerText = jsonResult.time;
	 		timeWrap.appendChild(timeContent);

	 		likeWrap.className = "footer-like";
	 		likeIcon.className = "glyphicon glyphicon-heart like-btn";
	 		likeContent.className = "like-nums";
	 		likeContent.innerText = " " + jsonResult.likesnum;


	 		timeWrap.appendChild(timeIcon);
	 		timeWrap.appendChild(timeContent);

	 		likeWrap.appendChild(likeIcon);
	 		likeWrap.appendChild(likeContent);


	 		footerDiv.className = "person-daily-footer";
	 		footerDiv.appendChild(timeWrap);
	 		footerDiv.appendChild(likeWrap);

	 		li.appendChild(footerDiv);


	 		frag.appendChild(li);


	 	}

	 	var ul = document.querySelector("#content-list");
	 	ul.innerHTML = "";
	 	ul.appendChild(frag);
	 }

	 //从 localStorage 中获取登陆时保存的用户名
	 function showUsername(){

	 	var username = localStorage.getItem("markername");

	 	$("#user-name").text(username);

	 	return username;
	 }


	 function initPage(){

	 	var username = showUsername();


	 	//输出右侧用户个人的内容
	 	$.ajax({
	 		url: '/umlProject/php/outputContent.php',
	 		type: 'GET',
	 		dataType: 'json',
	 		data: "username=" + username,
	 		success: function(data){
	 			createWorksElem(data);
	 			
	 		}
	 	})


	 	//输出左侧用户的头像
	 	$.ajax({
	 		url: '/umlProject/php/outputUserHeadToPersonalPage.php',
	 		type: 'GET',
	 		dataType: 'json',
	 		data: "username=" + username,
	 		success: function(data){
	 			// var result = JSON.parse(data);

	 			if (data.status == "success") {
	 				$("#header-img").attr("src",data.resource);

	 			}else{

	 				console.log(data.resource);
	 			}
	 		}
	 	})
	 	
	 	
	 	
	 	
	 }






	 //初始化页面
	 initPage();

	//设置富文本编辑器
	var summernote = $("#user-work-content").summernote({
		height: 250,
		minHeight: 250,
		maxHeight: 250,
		lang: 'zh-CN',
		focus: true,
		callbacks: {  
            onImageUpload: function(files, editor, $editable) {  
                sendFile(files);  
            }  
        }  
	})

	//手机菜单按钮点击事件
	EventUntil.addHandler(s("#menu-btn"), "click" ,function(){
		event = EventUntil.getEvent(event);
		EventUntil.preventDefault(event);

		if (s("#menu-list").style.display == undefined || s("#menu-list").style.display == "none") {
			
			s("#menu-list").style.display = "block";

		}else{
			s("#menu-list").style.display = "none";
		}
	})

	//当手指松开的时候
	EventUntil.addHandler(s("#menu-btn"), "touchend" ,function(event){
		s("#menu-btn").click();
	})

	EventUntil.addHandler(document, "click", function(event){
		
		s("#menu-list").style.display = "none";

		var downMenu = ss(".down-menu");

		for (var i = 0; i < downMenu.length; i++) {
			downMenu[i].style.display = 'none';
		}


	});

	EventUntil.addHandler(s("#quit-btn"),"click",function(event){
		event = EventUntil.preventDefault(event);
		window.location.replace("/umlProject/login.html");
	})


	//编辑菜单点击事件
	$(".edit-list").click(function(event){
		var ul = $(this).siblings('ul')[0];
		var posRight = $(this).css('margin-right');

		if (ul.style.display == undefined || ul.style.display == "none") {
			ul.style.right = posRight;
			ul.style.display = "block";
		}else{
			ul.style.display = "none";
		}
	})


	//弹出层关闭按钮点击事件
	$("#close").click(function(){
		//清空输入框的值，title，隐藏弹出层			
		$("#user-workt-title").val("");
		$("#user-workt-title").attr("title","");
		$("#user-work-content").summernote('code',"");

		$("#floor").fadeOut(300);
	})

	//上传按钮点击事件
	$("#publish").click(function(){

		var id = $("#user-workt-title").attr("title");
		var author = localStorage.getItem("markername");
		var title = $("#user-workt-title").val();
		var content = $("#user-work-content").summernote('code');

		var isEmpty = $("#user-work-content").summernote('isEmpty');


		if (isEmpty == false) {

			$.ajax({
				url: '/umlProject/php/publishWorks.php',
				type: 'POST',
				dataType: 'json',
				data: "worksId=" + id +"&username=" + author + "&workstitle=" + title + "&workscontent=" + content,
				success: function(data){
					if (data.status == "success") {
						alert("发布成功！");

						//发布成功后清空弹出层内容
						//调用输出数据库数据函数
						$.ajax({
					 		url: '/umlProject/php/outputContent.php',
					 		type: 'GET',
					 		dataType: 'json',
					 		data: "username=" + author,
					 		success: function(data){
					 			createWorksElem(data);
					 			
					 		}
					 	})


						//清空输入框的值，title，隐藏弹出层			
						$("#user-workt-title").val("");
						$("#user-workt-title").attr("title","");
						$("#user-work-content").summernote('code',"");
						$("#floor").fadeOut('300');
						
						
					}else{
						alert("发布失败");
					}
				}
			})

		}else{
			alert("你还没有输入内容哦");
		}	
		
	});



	
});