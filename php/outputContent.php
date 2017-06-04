<?php 
	$username = $_GET[username];

	$link = mysql_connect("localhost","root","123456");

	mysql_select_db("lovemark",$link);

	$sql = "select * from userworks where author = '$username' order by publishtime desc";

	$result = mysql_query($sql,$link);

	$arr = array();


	while ($rows = mysql_fetch_array($result)) {

		$id = $rows[id];
		$title = $rows[workstitle];
		$content = str_replace("\"", "'", $rows[workscontent]);
		$publishtime = $rows[publishtime];
		$likes = $rows[workslike];

		$arr[] = '{"id":"'.$id.'","title":"'.$title.'","content":"'.$content.'","time":"'.$publishtime.'","likesnum":"'.$likes.'"}';
		
	}

	echo json_encode($arr);


 ?>