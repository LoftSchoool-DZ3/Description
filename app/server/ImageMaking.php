<?php 
	
	require_once 'lib/WideImage.php';

	define("FILES_PATH", "files/source");
	define("RESULT_FILES_PATH", "files/result");



	function generateString($length = 8){
	  $chars = 'abdefhiknrstyzABDEFGHKNQRSTYZ23456789';
	  $numChars = strlen($chars);
	  $string = '';
	  for ($i = 0; $i < $length; $i++) {
	    $string .= substr($chars, rand(1, $numChars) - 1, 1);
	  }
	  return $string;
	}



	class ImageMaker{

		private $imgOrirginFileName;
		private $imgWatermarkFileName;

		private $origImagePath;
		private $watermarkImagePath;

		private $imgType; 
	
		function __construct($imgOrirginFileName, $imgWatermarkFileName)
			{
				$this->imgOrirginFileName = $imgOrirginFileName;
				$this->imgWatermarkFileName = $imgWatermarkFileName;
			}


		/*проверка на наличие файлов на сервере*/
		function CheckImageExists()
		{
			$result = false;			
		 	$origImagePath = dirname(__FILE__).DIRECTORY_SEPARATOR.FILES_PATH.DIRECTORY_SEPARATOR.$this->imgOrirginFileName;		
		 	$watermarkImagePath = dirname(__FILE__).DIRECTORY_SEPARATOR.FILES_PATH.DIRECTORY_SEPARATOR.$this->imgWatermarkFileName;
			if (file_exists($origImagePath)&&file_exists($watermarkImagePath)){
				$this->origImagePath = $origImagePath;
				$this->watermarkImagePath = $watermarkImagePath;
				$result = true;
			}
			return $result;
		}

	  /*проверка являются ли загруженные файлы допустимого формата*/
		function CheckImageType()
		{
			$result = false;
			if (in_array(exif_imagetype($this->watermarkImagePath), array(IMAGETYPE_GIF, IMAGETYPE_JPEG,  IMAGETYPE_PNG))){
				$this->imgType = exif_imagetype($this->origImagePath);
				$result = true;
			}			
			return $result;
		}

		function MakeImage($left = 0, $top = 0, $opacity = 50){			
			 $image = WideImage::load($this->origImagePath);
			 $watermark = WideImage::load($this->watermarkImagePath);
			 $new_image = $image->merge($watermark, $left, $top, $opacity);
			 $newImagePath = 'files/result/'.generateString(5).image_type_to_extension($this->imgType);
			 $new_image->saveToFile($newImagePath);			 
			 return $newImagePath;
		}
}
?>