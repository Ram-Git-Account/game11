<?php
$file_name = 'messages.txt';
$archived_file_name = 'archived_messages.txt';
$root_system_file_name = 'root_system_messages.txt';
$messages = file_get_contents($file_name);
$messages_array = explode("\n", $messages);

// Удаление сообщений со словами "script"
$unique_messages = array_filter($messages_array, function($message) {
    if (stripos($message, 'script') === false) {
        return true;
    } else {
        return false;
    }
});

// Обработка сообщений со словами "root" или "system"
$root_system_messages = array_filter($unique_messages, function($message) {
    if (stripos($message, 'root') !== false || stripos($message, 'system') !== false) {
        file_put_contents($root_system_file_name, $message . "\n", FILE_APPEND);
        return false;
    }
    return true;
});

// Удаление сообщений старше 30 минут
$root_system_messages = array_filter($root_system_messages, function($message) use ($archived_file_name) {
    $message_time = strtotime(substr($message, 0, 19));
    $current_time = time();
    if (($current_time - $message_time) > 200) { // Если сообщению больше 30 минут
        file_put_contents($archived_file_name, $message . "\n", FILE_APPEND); // Добавляем в архив
        return false; // Удаляем из списка
    }
    return true;
});

$unique_messages = implode("\n", $root_system_messages);

file_put_contents($file_name, $unique_messages);
echo $unique_messages;
?>
