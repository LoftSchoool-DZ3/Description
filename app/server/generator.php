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
		
		$origImgPathFull = "files/". $origImgPath;
		$watermarkPathFull = "files/". $watermarkPath;

  		$extOrig = substr(strrchr($origImgPath, '.'), 1);
  		$extWatermark = substr(strrchr($watermarkPath, '.'), 1);

  		switch ($extOrig) {
    		case "png":
        		$im = imagecreatefrompng($origImgPathFull);
        		imagealphablending($im, false);
				imagesavealpha($im, true);
        		break;
    		case "jpeg" or "jpg":
        		$im = imagecreatefromjpeg($origImgPathFull);
        		imagealphablending($im, false);
        		break;
    		case "gif":
    			$im = imagecreatefromgif($origImgPathFull);
        		break;
		};
		switch ($extWatermark) {
    		case "png":
        		$stamp = imagecreatefrompng($watermarkPathFull);
        		imagealphablending($stamp, false);
				imagesavealpha($stamp, true);
				

        		break;
    		case "jpeg" or "jpg":
        		$stamp = imagecreatefromjpeg($watermarkPathFull);
        		break;
    		case "gif":
    			$stamp = imagecreatefromgif($watermarkPathFull);
        		break;
		};

	function imagecopymerge_alpha($dst_im, $src_im, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h, $pct){ 
        // creating a cut resource 
        $cut = imagecreatetruecolor($src_w, $src_h); 

        // copying relevant section from background to the cut resource 
        imagecopy($cut, $dst_im, 0, 0, $dst_x, $dst_y, $src_w, $src_h); 
        
        // copying relevant section from watermark to the cut resource 
        imagecopy($cut, $src_im, 0, 0, $src_x, $src_y, $src_w, $src_h); 
        
        // insert cut resource to destination image 
        imagecopymerge($dst_im, $cut, $dst_x, $dst_y, 0, 0, $src_w, $src_h, $pct); 
    };
		
		
		
		// Установка позиции вотермарка и получение его высоты/ширины
		$marge_right =  $yOne;
		$marge_bottom =  $xOne;
		$sx = imagesx($stamp);
		$sy = imagesy($stamp);
		
		// Слияние изображений
		imagecopymerge_alpha($im, $stamp, $xOne, $yOne, 0, 0, $sx, $sy, $opacity);
		
		// Сохранение изображений в файл и освобождение памяти
		header('Content-type: image/png');
		imagepng($im, 'photo_stamp.png');
		imagedestroy($im);

	


 	 
	echo json_encode('server/photo_stamp.png');
	} else {
		$vyvod = "Что-то пошло не так..."; 
	echo json_encode($vyvod);
	}

 
 ?>