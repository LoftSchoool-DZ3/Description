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
		
		$origImgPathFull = "server/files/". $origImgPath;



 	//ДАУРЕН ПИШЕТ КОД ЗДЕСЬ!!!//

<<<<<<< HEAD
		if ($imgMaker->CheckImageExists()){
			if ($imgMaker->CheckImageType()){
					$newImg = $imgMaker->MakeImage($leftPos, $topPos);						
					// header('Content-type: application/octet-stream');
					// header('Content-Length: '.filesize($newImg));
					// header('Content-Disposition: attachment; filename='.basename($newImg));
					// readfile($newImg);
					echo $newImg;
			}
		}
=======
	


 	$vyvod = "" ; 
	echo json_encode($origImgPathFull);
	} else {
		$vyvod = "Что-то пошло не так..."; 
	echo json_encode($vyvod);
>>>>>>> b9da59b7645182d2c8df9bdb992583eb1aa47d32
	}

 
 ?>