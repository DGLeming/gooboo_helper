<?php
$error = $_COOKIE['error'];
setcookie("error", "", time() - 3600);

// сюда нужно вписать токен вашего бота
define('TELEGRAM_TOKEN', '6639265297:AAGStCciR2o5Y0GkY6H7BTHTCUm_bqJWi-s');

// сюда нужно вписать ваш внутренний айдишник
define('TELEGRAM_CHATID', '1848007242');

message_to_telegram($error);

function message_to_telegram($text)
{
    $ch = curl_init();
    curl_setopt_array(
        $ch,
        array(
            CURLOPT_URL => 'https://api.telegram.org/bot' . TELEGRAM_TOKEN . '/sendMessage',
            CURLOPT_POST => TRUE,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_POSTFIELDS => array(
                'chat_id' => TELEGRAM_CHATID,
                'text' => $text,
            ),
        )
    );
    curl_exec($ch);
}
?>