<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Include database configuration
include 'db_config.php';

// Get testimonials from database
$sql = "SELECT id, userName, title, rating, text, date, avatar, status 
        FROM testimonials 
        WHERE status = 'approved' 
        ORDER BY created_at DESC 
        LIMIT 100";

$result = $conn->query($sql);

$testimonials = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $testimonials[] = [
            'id' => $row['id'],
            'userName' => $row['userName'],
            'title' => $row['title'],
            'rating' => $row['rating'],
            'text' => $row['text'],
            'date' => $row['date'],
            'avatar' => $row['avatar'],
            'status' => $row['status']
        ];
    }
}

echo json_encode($testimonials);

$conn->close();
?>