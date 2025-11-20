<?php
// Create a new admin user with plain password
define('DB_HOST', 'localhost');
define('DB_NAME', 'u778565890_aipri_lifescie');
define('DB_USER', 'u778565890_aipri_admin');
define('DB_PASS', 'wrhz5acwtsiA');

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    
    // Delete existing
    $pdo->exec("DELETE FROM admin_users WHERE username = 'admin'");
    
    // Create new with simple password
    $password = 'admin123';
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    $stmt = $pdo->prepare("INSERT INTO admin_users (username, password) VALUES (?, ?)");
    $stmt->execute(['admin', $hashed_password]);
    
    echo "✅ New admin user created!<br>";
    echo "Username: admin<br>";
    echo "Password: admin123<br>";
    echo "Hashed: " . $hashed_password . "<br>";
    
} catch(Exception $e) {
    echo "❌ Error: " . $e->getMessage();
}
?>