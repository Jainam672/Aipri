<?php
// Database configuration - YOUR HOSTINGER DETAILS
define('DB_HOST', 'localhost');
define('DB_NAME', 'u778565890_aipri_lifescie');      // Your database name
define('DB_USER', 'u778565890_aipri_admin');         // Your database username  
define('DB_PASS', 'wrhz5acwtsiA');                   // Your database password

// Create connection
function getDBConnection() {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch(PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }
}

// Start session
session_start();
?>