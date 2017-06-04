<?php 
	
	$error = $_FILES['file']['error'];
	$imgName = $_FILES['file']['name'];
	$imgTmp = $_FILES['file']['tmp_name'];

	if($error > 0){
	  echo '{"status":"fail","message":"'.$_FILES['file']['error'].'"}';	
		
	}else{
	  $path = '../userimage/'. $imgName;
	  $fileRrsult = move_uploaded_file($imgTmp,$path);
	  
	  if($fileRrsult){
		  
		echo '{"status":"success","message":"userimage/'.$imgName.'"}';  
		
	  }else{
		echo '{"status":"fail"}';  
	  
  	  }
  	}

 ?>