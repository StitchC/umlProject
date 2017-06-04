<?php 

	$name = $_GET[username];

	$link = mysql_connect("localhost","root","123456");

	mysql_select_db("lovemark",$link);

	$sql = "select * from user where username = '$name'";

	$result = mysql_query($sql,$link);

	$arr = array();


	while ($rows = mysql_fetch_array($result)) {

		$account = $rows[account];
		$password = $rows[password];
		$email = $rows[email];
		$headimg = $rows[headimg];
		$mobilephone = $rows[phonenumber];

		$arr[] = '{"account":"'.$account.'","password":"'.$password.'","email":"'.$email.'","headimg":"'.$headimg.'","mobilephone":"'.$mobilephone.'"}';
		
	}

	echo json_encode($arr);

 ?>