<?php 
	$id = $_GET[worksId];

	$link = mysql_connect("localhost","root","123456");

	mysql_select_db("lovemark",$link);

	$sql = "select * from userworks where id = '$id'";

	$result = mysql_query($sql,$link);

	while ($rows = mysql_fetch_array($result)) {

		$id = $rows[id];
		$title = $rows[workstitle];
		$content = str_replace("\"", "'", $rows[workscontent]);
		$publishtime = $rows[publishtime];
		$likes = $rows[workslike];

		$arr[] = '{"id":"'.$id.'","title":"'.$title.'","content":"'.$content.'"}';
		
	}

	echo json_encode($arr);

 ?>