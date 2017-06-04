<?php 
	
	$username = $_POST[username];

	$account = $_POST[useraccount];

	$pwd = $_POST[userpwd];

	$usermail = $_POST[usermail];

	$link = mysql_connect('localhost','root','123456');

	mysql_select_db("lovemark",$link);

	$sql = "insert into user(username,account,password,email)values ('$username','$account','$pwd','$usermail')";

	$result = mysql_query($sql);

	if ($result) {
		echo '{"result":"success"}';
	}else{
		echo '{"result":"fail"}';
	}

 ?>