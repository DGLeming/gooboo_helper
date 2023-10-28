<?php
$fp = fopen('errors.txt', 'a');
fwrite($fp, $_COOKIE['error'].PHP_EOL);
	//file_put_contents('errors.txt', $_COOKIE['error'].PHP_EOL);
//file_put_contents('errors.txt', implode("\n", $_COOKIE['error']) . "\n", FILE_APPEND);
?>