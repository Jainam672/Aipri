<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'u778565890_aipri_lifescie');
define('DB_USER', 'u778565890_aipri_admin');
define('DB_PASS', 'wrhz5acwtsiA');

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Database connection SUCCESSFUL!<br>";
    
    // Check if tables exist
    $tables = $pdo->query("SHOW TABLES")->fetchAll();
    echo "✅ Tables in database: " . count($tables) . "<br>";
    
    foreach($tables as $table) {
        echo "Table: " . $table[0] . "<br>";
    }
    
    // Check if admin user exists
    $stmt = $pdo->query("SELECT * FROM admin_users");
    $admin = $stmt->fetch();
    
    if ($admin) {
        echo "✅ Admin user found: " . $admin['username'] . "<br>";
        echo "Password hash: " . $admin['password'] . "<br>";
    } else {
        echo "❌ No admin user found!<br>";
    }
    
} catch(PDOException $e) {
    echo "❌ Database connection FAILED: " . $e->getMessage();
}
?>