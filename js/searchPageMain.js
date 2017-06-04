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

	function waterFall(){
		//获取父元素
		var parent = document.querySelector("#search-content-list");
		//获取所有的图片盒子
		var boxs = document.querySelectorAll("#search-content-list .search-content-wrap");

		//获取元素宽度（元素宽固定所以获取第一个即可）
		var boxWidth = boxs[0].offsetWidth;
		
		//计算页面列数
		var cols = countCols(parent,boxs[0]);


		//定义数组 保存第一行每个box 的高度
		var minHeightArr = [];
		for (var i = 0; i < boxs.length; i++) {
			if (i < cols) {
				//如果此时的第i 个box 是第一行的元素把它推进数组里
				minHeightArr.push(boxs[i].offsetHeight);
			}else{
				//获取最小高度
				var minHeight = Math.min.apply(null,minHeightArr);
				//从最小高度值中找出对应最小高度元素的索引
				var minHeightElemIndex = minHeightArr.indexOf(minHeight);
				//然后设置第二行及以下行的元素的top 和 left 位置
				boxs[i].style.position = 'absolute';
				boxs[i].style.top = minHeight + "px";
				boxs[i].style.left = boxWidth * minHeightElemIndex + "px";

				minHeightArr[minHeightElemIndex] += boxs[i].offsetHeight;
			}
		}

		console.log(minHeightArr);
		console.log(minHeight);
		console.log(minHeightElemIndex);
	}

	//定义计算列数函数
	function countCols(parentElem,boxElem){
		//获取盒子的宽度
		var boxWidth = boxElem.offsetWidth;

		//获取父元素的宽度
		var parentWidth = parentElem.offsetWidth;

		//获取列数
		var cols = Math.floor(parentWidth/boxWidth);

		//设置父元素的宽度
		parentElem.style.cssText = "width:" + boxWidth*cols + "px;";

		return cols;

	}

	//检测是否具备加载数据块事件回掉函数
	function checkScrollSlider(){

		//获取所有的盒子元素
		var boxs = document.querySelectorAll("#search-content-list .search-content-wrap");

		//获取最后一个盒子
		var lastBox = boxs[boxs.length - 1];

		//获取最后一个盒子的高度参考值
		var lastBoxHeightArgs = lastBox.offsetTop + lastBox.offsetHeight;

		//获取滚动之后页面top 与可视窗口的距离
		//兼容标准模式和混杂模式
		var scrolltop = document.body.scrollTop || document.documentElement.scrollTop;

		//获取可视窗口的高
		var screenHeight = document.body.clientHeight || document.documentElement.clientHeight;

		//可视窗口高加滚动走的距离的最后结果
		var scrollResult = scrolltop + screenHeight;

		//如果最后一张图片的top 的距离小于滚动的距离 那么返回true 否则返回false
		return (lastBoxHeightArgs < scrollResult)?true:false;

	}

	//遍历模拟json 数据生成元素
	function createImgElem(data,parentElem){
		var arr = data.data;
		var frag = document.createDocumentFragment();

		for (var i = 0; i < arr.length; i++) {
			var div = document.createElement("div"),
				img = document.createElement("img"),
				a = document.createElement("a"),
				span = document.createElement("span"),
				p = document.createElement("p");

			//创建元素
			var wrap = div.cloneNode(),    //创建帖子包裹层
				content = div.cloneNode(), //创建内容包裹层
				header = div.cloneNode(),  //创建内容头部包裹层
				authorInfo = div.cloneNode(), //创建作者头像和名字包裹层
				btn = div.cloneNode(),	//创建关注按钮包裹层
				main = div.cloneNode(), //创建主内容包裹层
				footer = div.cloneNode(), //创建底部包裹层

				headImg = img.cloneNode(), //创建用户头像图片
				contentImg = img.cloneNode(),//创建内容图片

				name = a.cloneNode(), //创建用户名元素
				follow = a.cloneNode(),//创建 "关注" 按钮

				txt = p.cloneNode(),//创建文章内容元素

				likeIcon = span.cloneNode(),//创建 "赞" 按钮
				likeNum = span.cloneNode(); //创建赞数量元素		

			//为包裹层添加类名
			wrap.className = "search-content-wrap";
			content.className = "search-content";
			header.className = "content-header";
			authorInfo.className = "author-info";
			btn.className = "follow-btn";
			main.className = "content-main";
			txt.clasName = "main-text";
			footer.className = "content-foote";
			likeIcon.className = "glyphicon glyphicon-heart-empty like-btn";
			likeNum.className = "like-nums";


			//为包裹层内容元素添加内容
			//头部内容
			headImg.src = arr[i].headerImgSrc;
			name.innerText = arr[i].authorName;
			follow.innerText = "关注";

			authorInfo.appendChild(headImg);
			authorInfo.appendChild(name);
			btn.appendChild(follow);

			header.appendChild(authorInfo);
			header.appendChild(btn);

			//主体内容
			contentImg.src = arr[i].txtImgSrc;
			txt.innerText = arr[i].txt;

			main.appendChild(contentImg);
			main.appendChild(txt);

			//底部内容
			likeNum.innerText = arr[i].likesNum;
			footer.appendChild(likeIcon);
			footer.appendChild(likeNum);

			content.appendChild(header);
			content.appendChild(main);
			content.appendChild(footer);

			wrap.appendChild(content);

			frag.appendChild(wrap);
			
		}

		parentElem.appendChild(frag);
		waterFall();
	}



	//模拟json 数据
	var jsonData = {"data":[
		{authorName: "Stitch",headerImgSrc: "userimage/head-icon.jpg", txtImgSrc: "images/23.jpg", txt: "事情怎么辣么多😭只想做一条咸鱼啊...6月你快点走开orz", likesNum: 1166},
		{authorName: "Stitch",headerImgSrc: "userimage/head-icon.jpg", txtImgSrc: "images/24.jpg", txt: "事情怎么辣么多😭只想做一条咸鱼啊...6月你快点走开orz", likesNum: 1166},
		{authorName: "Stitch",headerImgSrc: "userimage/head-icon.jpg", txtImgSrc: "images/25.jpg", txt: "事情怎么辣么多😭只想做一条咸鱼啊...6月你快点走开orz", likesNum: 1166},
		{authorName: "Stitch",headerImgSrc: "userimage/head-icon.jpg", txtImgSrc: "images/26.jpg", txt: "事情怎么辣么多😭只想做一条咸鱼啊...6月你快点走开orz", likesNum: 1166},
		{authorName: "Stitch",headerImgSrc: "userimage/head-icon.jpg", txtImgSrc: "images/27.jpg", txt: "事情怎么辣么多😭只想做一条咸鱼啊...6月你快点走开orz", likesNum: 1166},
		{authorName: "Stitch",headerImgSrc: "userimage/head-icon.jpg", txtImgSrc: "images/28.jpg", txt: "事情怎么辣么多😭只想做一条咸鱼啊...6月你快点走开orz", likesNum: 1166}
	]};

	EventUntil.addHandler(window,"scroll",function(){
		//获取父元素
		var parent = document.querySelector("#search-content-list");

		//如果当前滚动到达最后一张图片的底部
		//调用构造元素函数
		//输出模拟json 数据的元素
		if (checkScrollSlider() == true) {
			createImgElem(jsonData,parent);
		}
	})

	waterFall();
});