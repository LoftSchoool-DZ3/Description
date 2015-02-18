<?php 
	
	$post = (!empty($_POST)) ? true : false;

	if($post){


		$origImgPath = stripslashes($_POST['orig-img-srvpath']);
		$watermarkPath = stripslashes($_POST['watermark-srvpath']);
		$radio = stripslashes($_POST['radio']);
		$xOne = stripslashes($_POST['x-one']);
		$yOne = stripslashes($_POST['y-one']);
		$xTile = stripslashes($_POST['x-tile']);
		$yTile = stripslashes($_POST['y-tile']);
		$opacity = stripslashes($_POST['opacity']);
		
 	

 	//ДАУРЕН ПИШЕТ КОД ЗДЕСЬ!!!//

	


 	$vyvod = "ggg"; 
	echo json_encode($vyvod);
	} else {
		$vyvod = "Что-то пошло не так..."; 
	echo json_encode($vyvod);
	}

 
 ?>