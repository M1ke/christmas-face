<?php
$img=file_get_contents($_GET['file']);
header('Content-Type: image/jpeg');
echo $img;