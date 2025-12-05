<?php
// db_config.php
$host = 'localhost';
$username = 'root'; 
$password = ''; 
$database = 'cleaning_testimonials'; 

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>