define(["jquery.min"],function($){
	//封装表单验证类
	var checkBy = {
		//提示信息数据,包含正则表达式及各种情况下的提示信息
		hintsData: null,

		//初始化提示对象内信息对象
		init: function(obj){
			this.hintsData = obj;
		},

		//找出提示信息元素方法
		findHintsContain: function(elem,hintsContent){
			//获取当前元素的父元素
			var father = elem.parentNode;
			//获取当前的提示框元素
			var hintsContain;
			if (hintsContent.indexOf(".") == 0) {
				return hintsContain = father.querySelectorAll(hintsContent)[0];

			}else if (hintsContent.indexOf("#") == 0) {
				return hintsContain = father.querySelector(hintsContent);

			}else{
				return hintsContain = father.querySelectorAll(hintsContent)[0];
			}
		},

		//input聚焦时执行验证
		onFocus: function(elem,hintcolor){
			//元素聚焦的时候改变外边框的颜色和阴影
			elem.style.borderColor = hintcolor;
			elem.style.boxShadow = "0px 0px 10px" + hintcolor;
		},

		reg: function(elem,hintsContent,correctColor,errorColor){
			//获取当前元素的id 匹配提示内容的键
			var id = elem.id;
			elem.isCorrect = false;
			var hintsContain = this.findHintsContain(elem,hintsContent);

			if (this.hintsData[id]["reg"].test(elem.value)) {
				hintsContain.innerText = this.hintsData[id]["correct"];
				elem.style.borderColor = correctColor;
				elem.style.boxShadow = "0px 0px 10px" + correctColor;
				hintsContain.style.color = correctColor;
				hintsContain.style.display = 'block';
				elem.isCorrect = true;

				return true;
			}else{
				elem.style.borderColor = errorColor;
				elem.style.boxShadow = "0px 0px 10px" + errorColor;
				hintsContain.innerText = this.hintsData[id]["error"];
				hintsContain.style.color = errorColor;
				hintsContain.style.display = 'block';
				elem.isCorrect = false;

				return false;
			}
		},

		ajax: function(obj){
			/*
				{	
					elem: //验证的元素,
					hintsContent: //提示框元素,
					errorColor: //错误时显示的颜色,
					url: //后台处理页地址,
					reqData: //发送过去的内容（以对象的形式保存）
					correctBool: //返回数据的正确值值名
					errorBool: //返回数据的错误值名
					result: //返回的数据键名
				}
			*/
			var that = this;
			var bool;
			var id = obj["elem"].id;
			//元素 isCorrect 属性附初值
			obj["elem"].isCorrect = false;

			//找到提示框元素
			var hintsContain = this.findHintsContain(obj["elem"],obj["hintsContent"]);
			//整理为json 字符串
			// var formateData = JSON.stringify(obj["reqData"]);

			//保存后台返回键的名
			var resultCode = obj["result"];

			$.ajax({
				url: obj["url"],
				type: 'GET',
				async: false,
				dataType: 'json',
				//传入后台页面的数据
				data: obj["reqData"],
				success: function(data){
					/*
						返回的数据格式
						{"result":"true/false"}
					*/

					//如果返回json 数据的对应键的内容等于规定好的错误内容
					//提示错误

					if (data[resultCode] == obj["errorBool"]) {

						hintsContain.innerText = that.hintsData[id]["ajaxError"];
						hintsContain.style.color = obj["errorColor"];
						obj["elem"].style.borderColor = obj["errorColor"];
						obj["elem"].style.boxShadow = "0 0 10px " + obj["errorColor"];
						
						obj["elem"].isCorrect = false;
						bool = false;
					}else{
						//如果不是isCorrect 属性赋值为 true
						obj["elem"].isCorrect = true;
						bool = true;
					}
				}
			});

			return bool;
			
		},

		sibling: function(elem,siblingId,hintsContent,correctColor,errorColor){
			//获取当前元素的id 匹配提示内容的键
			var id = elem.id;
			elem.isCorrect = false;
			var hintsContain = this.findHintsContain(elem,hintsContent);
			var sibling = document.querySelector("#" + siblingId);

			if (elem.value == sibling.value && elem.value != "") {
				hintsContain.innerText = this.hintsData[id]["correct"];
				hintsContain.style.color = correctColor;
				hintsContain.style.display = 'block';
				elem.style.borderColor = correctColor;
				elem.style.boxShadow = "0px 0px 10px " + correctColor;
				elem.isCorrect = true;
			}else{
				hintsContain.innerText = this.hintsData[id]["error"];
				hintsContain.style.color = errorColor;
				hintsContain.style.display = 'block';
				elem.style.borderColor = errorColor;
				elem.style.boxShadow = "0px 0px 10px " + errorColor;
				elem.isCorrect = false;
			}
		}
	};

	return checkBy;

})