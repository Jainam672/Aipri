<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("INSERT INTO inquiries (name, email, phone, message, created_at) VALUES (?, ?, ?, ?, NOW())");
    
    if ($stmt->execute([$name, $email, $phone, $message])) {
        echo json_encode(['success' => true, 'message' => 'Inquiry submitted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to submit inquiry']);
    }
}
?>