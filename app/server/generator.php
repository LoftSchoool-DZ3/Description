<?php 
	error_reporting(E_ALL);
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

		//Проверка существования картинок пользователя, 
        //если их не было - ставим картинки по умолчанию
		if ($origImgPath == "") {
            $origImgPathFull = "../img/orig-img.jpg";
            $extOrig = "jpg";
        } else {
            $origImgPathFull = "files/". $origImgPath;
            $extOrig = substr(strrchr($origImgPath, '.'), 1);
        }

        if ($watermarkPath == "") {
            $watermarkPathFull = "../img/watermark.png";
            $extWatermark = "png";
        } else {
            $watermarkPathFull = "files/". $watermarkPath;
            $extWatermark = substr(strrchr($watermarkPath, '.'), 1);
        }

  		switch ($extOrig) {
    		case "png":
        		$im = imagecreatefrompng($origImgPathFull);
        		imagealphablending($im, true);
				imagesavealpha($im, true);
        		break;
        		case "gif":
    			$im = imagecreatefromgif($origImgPathFull);
				$tempimage = imagecreatetruecolor(imagesx($im),imagesy($im));
	        	imagecopy($tempimage, $im, 0, 0, 0, 0,imagesx($im), imagesx($im));
        		$im = $tempimage;
    			
        		break;
    		case "jpeg":
    		case "jpg":
        		$im = imagecreatefromjpeg($origImgPathFull);
        		break;
		};
		switch ($extWatermark) {
    		case "png":
        		$stamp = imagecreatefrompng($watermarkPathFull);

				break;
    		case "gif":
    			$stamp = imagecreatefromgif($watermarkPathFull);
				$tempimage = imagecreatetruecolor(imagesx($stamp),imagesy($stamp));
	        	imagecopy($tempimage, $stamp, 0, 0, 0, 0,imagesx($stamp), imagesx($stamp));
        		$stamp = $tempimage;
    			
        		break;
    		case "jpg":
    		case "jpeg":
        		$stamp = imagecreatefromjpeg($watermarkPathFull);
        		break;
    		
		};
		
		

function imagecopymerge_alpha($dst_im, $src_im, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h, $pct){ 
    if(!isset($pct)){ 
        return false; 
    } 
    $pct /= 100; 
    // Get image width and height 
    $w = imagesx( $src_im ); 
    $h = imagesy( $src_im ); 
    // Turn alpha blending off 
    imagealphablending( $src_im, false ); 
    // Find the most opaque pixel in the image (the one with the smallest alpha value) 
    $minalpha = 127; 
    for( $x = 0; $x < $w; $x++ ) 
    for( $y = 0; $y < $h; $y++ ){ 
        $alpha = ( imagecolorat( $src_im, $x, $y ) >> 24 ) & 0xFF; 
        if( $alpha < $minalpha ){ 
            $minalpha = $alpha; 
        } 
    } 
    //loop through image pixels and modify alpha for each 
    for( $x = 0; $x < $w; $x++ ){ 
        for( $y = 0; $y < $h; $y++ ){ 
            //get current alpha value (represents the TANSPARENCY!) 
            $colorxy = imagecolorat( $src_im, $x, $y ); 
            $alpha = ( $colorxy >> 24 ) & 0xFF; 
            //calculate new alpha 
            if( $minalpha !== 127 ){ 
                $alpha = 127 + 127 * $pct * ( $alpha - 127 ) / ( 127 - $minalpha ); 
            } else { 
                $alpha += 127 * $pct; 
            } 
            //get the color index with new alpha 
            $alphacolorxy = imagecolorallocatealpha( $src_im, ( $colorxy >> 16 ) & 0xFF, ( $colorxy >> 8 ) & 0xFF, $colorxy & 0xFF, $alpha ); 
            //set pixel with the new color + opacity 
            if( !imagesetpixel( $src_im, $x, $y, $alphacolorxy ) ){ 
                return false; 
            } 
        } 
    } 
    // The image copy 
    imagecopy($dst_im, $src_im, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h); 
};
		
		
		
		

		// Установка позиции вотермарка и получение его высоты/ширины
		$marge_right =  $yOne;
		$marge_bottom =  $xOne;
		$sx = imagesx($stamp);
		$sy = imagesy($stamp);
		
		// Слияние изображений
		imagecopymerge_alpha($im, $stamp, $xOne, $yOne, 0, 0, $sx, $sy, $opacity);
		
		//Генерация имени файла
		function generateName($length){
  			$chars = 'abdefhiknrstyzABDEFGHKNQRSTYZ23456789';
  			$numChars = strlen($chars);
  			$string = '';
  			for ($i = 0; $i < $length; $i++) {
   				$string .= substr($chars, rand(1, $numChars) - 1, 1);
  			}
  			return $string;
		};

		$newFileName = "files/" . generateName(5) . ".png";
		$resultFilePath = "server/" . $newFileName;

		// Сохранение изображений в файл и освобождение памяти
		//header('Content-type: image/png');
		imagepng($im, $newFileName);
		imagedestroy($im);

 	 
	echo json_encode($resultFilePath);
	} else {
		$vyvod = "Что-то пошло не так..."; 
	echo json_encode($vyvod);
	}

 
 ?>