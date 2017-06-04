<?php 
	$username = $_POST[username];
	$imgSrc = $_POST[src];

	$link = mysql_connect("localhost","root","123456");

	mysql_select_db("lovemark",$link);

	$sql = "update user set headimg = '$imgSrc' where username = '$username'";

	$result = mysql_query($sql);

	if ($result) {
		
		echo '{"status":"success"}';
	}else{
		echo '{"status":"fail"}';
	}
 ?>