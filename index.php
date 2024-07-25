<?php
// Проверяем, была ли отправлена форма
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $target_dir = __DIR__ . "/uploads/"; // Директория для сохранения файлов
    $target_file = $target_dir . basename($_FILES["file"]["name"]); // Полный путь к файлу
    $uploadOk = 1; // Флаг для проверки успешной загрузки

    // Проверка размера файла
    if ($_FILES["file"]["size"] > 50000000) { // 50 MB
        echo "Размер файла не должен превышать 50 МБ.";
        $uploadOk = 0;
    }

    // Если все проверки пройдены, сохраняем файл
    if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            echo "Файл " . basename($_FILES["file"]["name"]) . " был успешно загружен.";
        } else {
            echo "Произошла ошибка при загрузке файла. Код ошибки: " . $_FILES["file"]["error"];
            switch ($_FILES["file"]["error"]) {
                case UPLOAD_ERR_OK:
                    echo "Файл был успешно загружен.";
                    break;
                case UPLOAD_ERR_INI_SIZE:
                    echo "Размер файла превышает ограничение, установленное в php.ini.";
                    break;
                case UPLOAD_ERR_FORM_SIZE:
                    echo "Размер файла превышает ограничение, установленное в HTML-форме.";
                    break;
                case UPLOAD_ERR_PARTIAL:
                    echo "Файл был загружен не полностью.";
                    break;
                case UPLOAD_ERR_NO_FILE:
                    echo "Файл не был загружен.";
                    break;
                case UPLOAD_ERR_NO_TMP_DIR:
                    echo "Отсутствует временная директория.";
                    break;
                case UPLOAD_ERR_CANT_WRITE:
                    echo "Не удалось записать файл на диск.";
                    break;
                case UPLOAD_ERR_EXTENSION:
                    echo "Загрузка файла была остановлена расширением.";
                    break;
                default:
                    echo "Произошла неизвестная ошибка.";
            }
            error_log("Ошибка загрузки файла: " . $_FILES["file"]["error"]);
        }
    }
}

// Функция для удаления файла
function deleteFile($filename) {
    $target_dir = __DIR__ . "/uploads/";
    $target_file = $target_dir . $filename;
    if (file_exists($target_file)) {
        if (unlink($target_file)) {
            echo "Файл '$filename' был успешно удален.";
        } else {
            echo "Произошла ошибка при удалении файла '$filename'.";
        }
    } else {
        echo "Файл '$filename' не найден.";
    }
}

// Получаем список файлов в директории для загрузки
$uploads_dir = __DIR__ . "/uploads/";
if (is_dir($uploads_dir)) {
    $uploaded_files = array_diff(scandir($uploads_dir), array('.', '..'));
} else {
    $uploaded_files = [];
    echo "Директория для загрузки файлов не найдена.";
}

// Обработка запросов на удаление файлов
if (isset($_POST['delete_file'])) {
    $file_to_delete = $_POST['delete_file'];
    deleteFile($file_to_delete);
}
?>
<?php
$file_name = 'messages.txt'; // Имя файла для сохранения сообщений

// Обработка формы для отправки сообщения
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['name']) && isset($_POST['message'])) {
    $name = $_POST['name'];
    $message = $_POST['message'];

    // Записываем сообщение в файл
    $message_data = date('Y-m-d H:i:s') . " - " . $name . ": " . $message . "\n";
    file_put_contents($file_name, $message_data, FILE_APPEND);

    echo "Сообщение успешно отправлено!";
}

// Читаем содержимое файла с сообщениями
$messages = file_get_contents($file_name);
$file_modified_time = filemtime($file_name);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Загрузка и просмотр файлов</title>
     <script>
var lastModifiedTime = <?php echo $file_modified_time; ?>;

function updateMessages() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'update_messages.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('messages').innerHTML = xhr.responseText;
            lastModifiedTime = <?php echo $file_modified_time; ?>;
        }
    };
    xhr.send();
}

window.onload = function() {
    updateMessages();
    setInterval(updateMessages, 2500);
};


    </script>

</head>
<body>
    <h1>Загрузите файл</h1>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post" enctype="multipart/form-data">
        <input type="file" name="file" id="file">
        <input type="submit" value="Загрузить" name="submit">
    </form>

    <h2>Загруженные файлы:</h2>
    <?php if (count($uploaded_files) > 0): ?>
        <ul>
            <?php foreach ($uploaded_files as $file): ?>
                <li>
                    <a href="<?php echo "uploads/" . $file; ?>" target="_blank"><?php echo $file; ?></a>
                    <a href="<?php echo "uploads/" . $file; ?>" download>Скачать</a>
                    <form method="post" action="">
                        <input type="hidden" name="delete_file" value="<?php echo $file; ?>">
                        <input type="submit" value="Удалить" onclick="return confirm('Вы уверены, что хотите удалить этот файл?');">
                    </form>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>Нет загруженных файлов.</p>
    <?php endif; ?>
 <h1>Оставьте сообщение</h1>
 <i>Не писать слишком длинные!!! Все сообщения удаляются через 20 секунд</i>
    <form method="post" action="">
        <label for="name">Ваше имя:</label>
        <input type="text" id="name" name="name" required>
        <br>
        <label for="message">Ваше сообщение:</label>
        <textarea id="message" name="message" required></textarea>
        <br>
        <input type="submit" value="Отправить">
    </form>

    <h2>Сообщения:</h2>
    <pre id="messages">
    
    <pre><?php echo $messages; ?></pre>
</body>
</html>

