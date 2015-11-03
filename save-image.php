<?php
$img = file_get_contents($_GET['file']);
$file = $_GET['file'];
$file = substr($file, strrpos($file, '/')+1);
$file = 'images/'.$file;
if (!file_exists($file)){
	$fh = fopen($file,'w');
	if (!empty($fh)){
		fwrite($fh, $img);
		fclose($fh);
	}
}
echo $file;