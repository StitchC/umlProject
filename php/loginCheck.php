<?php 
	$account = $_POST[username];
	$pwd = $_POST[userpwd];

	$link = mysql_connect('localhost','root','123456');

	mysql_select_db("lovemark",$link);

	$sql = "select username from user where account = '$account' and password = '$pwd'";

	$result = mysql_query($sql,$link);

	if (mysql_num_rows($result)) {

		
		while ($arr = mysql_fetch_array($result)) {
			echo '{"status":"correct","username":"'.$arr[username].'"}';
		}

	}else{

		echo '{"status":"error","errorText":"账号或密码错误"}';
	}

 ?>