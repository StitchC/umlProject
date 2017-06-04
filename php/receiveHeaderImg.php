<?php 
	
	$error = $_FILES['file']['error'];
	$imgName = $_FILES['file']['name'];
	$imgTmp = $_FILES['file']['tmp_name'];

	$link = mysql_connect("localhost","root","123456");
	mysql_select_db("lovemark",$link);

	if($error > 0){
	  echo '{"status":"fail","message":"'.$_FILES['file']['error'].'"}';	
		
	}else{
	  $path = '../userimage/markeruser'. $imgName;
	  $fileRrsult = move_uploaded_file($imgTmp,$path);
	  
	  if($fileRrsult){

		echo '{"status":"success","message":"userimage/markeruser'.$imgName.'"}';

	  }else{

		echo '{"status":"fail"}';  
	  
  	  }
  	}
	
 ?>