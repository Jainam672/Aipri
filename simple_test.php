<?php
echo "<h1>PHP IS WORKING!</h1>";
echo "<p>Server: " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
echo "<p>PHP Version: " . phpversion() . "</p>";
echo "<p>Time: " . date('Y-m-d H:i:s') . "</p>";

// Test database connection
try {
    $pdo = new PDO("mysql:host=localhost;dbname=u778565890_aipri_lifescie", "u778565890_aipri_admin", "wrhz5acwtsiA");
    echo "<p style='color: green;'>✅ Database Connected Successfully!</p>";
} catch(PDOException $e) {
    echo "<p style='color: red;'>❌ Database Error: " . $e->getMessage() . "</p>";
}
?>