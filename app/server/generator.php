<?php 
	
	require_once 'ImageMaking.php';

	define("INPUT_ORIGIN_IMG_NAME", "orig-img-srvpath");
	define("INPUT_WATERMARK_IMG_NAME", "watermark-srvpath");



	if (isset($_POST[INPUT_ORIGIN_IMG_NAME])&&isset($_POST[INPUT_WATERMARK_IMG_NAME])){
		
		$imgOriginVal = $_POST[INPUT_ORIGIN_IMG_NAME];
		$imgWatermarkVal = $_POST[INPUT_WATERMARK_IMG_NAME];

		$imgMaker = new ImageMaker($imgOriginVal, $imgWatermarkVal);
		if ($imgMaker->CheckImageExists()){
			if ($imgMaker->CheckImageType()){
					$imgMaker->MakeImage();
				
			}
		}
	}

 ?>