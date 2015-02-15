<?php 
	
	require_once 'ImageMaking.php';

	define("INPUT_ORIGIN_IMG_NAME", "orig-img-srvpath");
	define("INPUT_WATERMARK_IMG_NAME", "watermark-srvpath");
	define("INPUT_LEFT_POS_NAME", "x-one");
	define("INPUT_TOP_POS_NAME", "y-one");

	if (isset($_POST[INPUT_ORIGIN_IMG_NAME])&&isset($_POST[INPUT_WATERMARK_IMG_NAME])){
		
		$imgOriginVal = $_POST[INPUT_ORIGIN_IMG_NAME];
		$imgWatermarkVal = $_POST[INPUT_WATERMARK_IMG_NAME];

		$imgMaker = new ImageMaker($imgOriginVal, $imgWatermarkVal);

		/*получаем значения координат фотермарка с формы*/
		$leftPos = (int)$_POST[INPUT_LEFT_POS_NAME];
		$topPos = (int)$_POST[INPUT_TOP_POS_NAME];



		if ($imgMaker->CheckImageExists()){
			if ($imgMaker->CheckImageType()){
					$imgMaker->MakeImage($leftPos, $topPos);				
			}
		}
	}

 ?>