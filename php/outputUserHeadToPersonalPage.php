<?php 	

	$username = $_GET[username];

	$link = mysql_connect("localhost","root","123456");

	mysql_select_db("lovemark",$link);

	$sql = "select headimg from user where username = '$username'";

	$result = mysql_query($sql);

	if ($result) {
		while($rows = mysql_fetch_array($result)){
			echo '{"status":"success","resource":"'.$rows[headimg].'"}';
		}
	}else{
		echo '{"status":"fail","resource":"'.mysql_errno().'"}';
	}

?>