<?php 
	$mail = $_GET[inputVal];

	$link = mysql_connect('localhost','root','123456');

	mysql_select_db("lovemark",$link);

	$sql = "select * from user where email = '$mail'";

	$result = mysql_query($sql);

	if (mysql_num_rows($result)) {
		echo '{"inputStatus":"exist"}';
	}else{
		echo '{"inputStatus":"notExist"}';
	}
 ?>