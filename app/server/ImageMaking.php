<?php 
	
	require_once 'lib/WideImage.php';

	define("FILES_PATH", "files");


	class ImageMaker{

		private $imgOrirginFileName;
		private $imgWatermarkFileName;

		private $origImagePath;
		private $watermarkImagePath;
	
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
			if (in_array(exif_imagetype($this->watermarkImagePath), array(IMAGETYPE_GIF, IMAGETYPE_JPEG,  IMAGETYPE_PNG)))
				$result = true;
			return $result;
		}

		function MakeImage(){			
			 $image = WideImage::load($this->origImagePath);
			 $watermark = WideImage::load($this->watermarkImagePath);
			 $new_image = $image->merge($watermark,-10,-10,60);
			 $new_image->saveToFile('files/test.jpg');
			 echo $this->watermarkImagePath;
		}

}
?>