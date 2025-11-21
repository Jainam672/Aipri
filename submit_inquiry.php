<?php
require_once 'config.php';

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set header for JSON response
header('Content-Type: application/json');

// Log the request
error_log("=== INQUIRY FORM SUBMISSION START ===");
error_log("Request method: " . $_SERVER['REQUEST_METHOD']);
error_log("POST data: " . print_r($_POST, true));

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    // Get form data
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    
    error_log("Form data - Name: $name, Email: $email, Phone: $phone");

    // Validate required fields
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        error_log("Validation failed: Missing required fields");
        echo json_encode(['success' => false, 'message' => 'All fields are required. Please fill in all fields.']);
        exit;
    }
    
    try {
        $pdo = getDBConnection();
        error_log("Database connected successfully");
        
        $stmt = $pdo->prepare("INSERT INTO inquiries (name, email, phone, message, created_at) VALUES (?, ?, ?, ?, NOW())");
        $result = $stmt->execute([$name, $email, $phone, $message]);
        
        if ($result) {
            $inquiry_id = $pdo->lastInsertId();
            error_log("Inquiry saved successfully. ID: " . $inquiry_id);
            echo json_encode(['success' => true, 'message' => 'Inquiry submitted successfully! We will contact you soon.']);
        } else {
            error_log("Database insertion failed");
            echo json_encode(['success' => false, 'message' => 'Failed to save inquiry to database.']);
        }
        
    } catch(PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    error_log("Invalid request method: " . $_SERVER['REQUEST_METHOD']);
    echo json_encode(['success' => false, 'message' => 'Invalid request method. Expected POST, got ' . $_SERVER['REQUEST_METHOD']]);
}

error_log("=== INQUIRY FORM SUBMISSION END ===");
?>