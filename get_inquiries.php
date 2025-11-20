<?php
require_once 'config.php';

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('HTTP/1.1 403 Forbidden');
    exit;
}

$pdo = getDBConnection();
$stmt = $pdo->query("SELECT * FROM inquiries ORDER BY created_at DESC");
$inquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($inquiries);
?>