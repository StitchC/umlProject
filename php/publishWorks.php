<?php 
	$id = $_POST[worksId];
	$author = $_POST[username];
	$title = $_POST[workstitle];
	$content = $_POST[workscontent];
	$curdate = date("Y-m-d h:i:sa");

	$link = mysql_connect("localhost","root","123456");

	mysql_select_db("lovemark",$link);


	if ($id == "") {

		$sql = "insert into userworks(author,workstitle,workscontent,publishtime)values ('$author','$title','$content','$curdate')";
	}else{
		$sql = "update userworks set workstitle = '$title', workscontent = '$content', publishtime = '$curdate' where id = '$id'";
	}
	

	$result = mysql_query($sql);

	if ($result) {
		echo '{"status":"success"}';
	}else{
		echo '{"status":"error","mysqlerror":"'.mysql_error().'"}';
	}

 ?>