<?php
require_once 'config.php';

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('HTTP/1.1 403 Forbidden');
    exit;
}

$pdo = getDBConnection();
$stmt = $pdo->query("SELECT * FROM inquiries ORDER BY created_at DESC");
$inquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Set headers for Excel download
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment; filename="inquiries_' . date('Y-m-d') . '.xls"');

// Excel header
echo "ID\tName\tEmail\tPhone\tMessage\tDate\n";

// Data rows
foreach ($inquiries as $inquiry) {
    echo $inquiry['id'] . "\t";
    echo $inquiry['name'] . "\t";
    echo $inquiry['email'] . "\t";
    echo $inquiry['phone'] . "\t";
    echo str_replace(["\t", "\n", "\r"], ' ', $inquiry['message']) . "\t";
    echo $inquiry['created_at'] . "\n";
}
exit;
?>