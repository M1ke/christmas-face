<?php
$img=file_get_contents($_GET['file']);
$file=$_GET['file'];
$file=substr($file,strrpos('/',$file)+1);
$fh=fopen('images/'.$file,'w');
if (!empty($fh)){
	fwrite($fh,$img);
	fclose($fh);
}
echo 1;