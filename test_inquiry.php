<?php
// Test if inquiry submission works
define('DB_HOST', 'localhost');
define('DB_NAME', 'u778565890_aipri_lifescie');
define('DB_USER', 'u778565890_aipri_admin');
define('DB_PASS', 'wrhz5acwtsiA');

echo "<h3>Inquiry System Test</h3>";

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    echo "✅ Database connected<br>";
    
    // Test direct database insertion
    $test_name = "Test User";
    $test_email = "test@example.com";
    $test_phone = "1234567890";
    $test_message = "This is a test inquiry";
    
    $stmt = $pdo->prepare("INSERT INTO inquiries (name, email, phone, message) VALUES (?, ?, ?, ?)");
    $result = $stmt->execute([$test_name, $test_email, $test_phone, $test_message]);
    
    if ($result) {
        echo "✅ Direct database insertion WORKING!<br>";
        echo "Test inquiry added to database<br>";
    } else {
        echo "❌ Direct database insertion FAILED<br>";
    }
    
    // Count current inquiries
    $count_stmt = $pdo->query("SELECT COUNT(*) as total FROM inquiries");
    $count = $count_stmt->fetch()['total'];
    echo "Total inquiries in database: <strong>" . $count . "</strong><br>";
    
} catch(Exception $e) {
    echo "❌ Error: " . $e->getMessage();
}
?>