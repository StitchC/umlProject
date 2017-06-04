<?php 

	$id = $_POST[worksId];

	$link = mysql_connect("localhost","root","123456");

	mysql_select_db("lovemark",$link);

	$sql = "delete from userworks where id = '$id'";

	$result = mysql_query($sql,$link);

	if ($result) {
		echo '{"status":"success"}';
	}else{
		echo '{"status":"error"}';
	}


 ?>