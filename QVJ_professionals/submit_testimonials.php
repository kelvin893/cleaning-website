<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Include database configuration
include 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data from the request
    $input = json_decode(file_get_contents('php://input'), true);
    
    $userName = trim($input['userName'] ?? '');
    $reviewTitle = trim($input['reviewTitle'] ?? '');
    $reviewRating = intval($input['reviewRating'] ?? 0);
    $reviewText = trim($input['reviewText'] ?? '');
    
    // Validation
    if (empty($userName) || empty($reviewTitle) || empty($reviewText) || $reviewRating < 1 || $reviewRating > 5) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Please fill all fields correctly.']);
        exit;
    }
    
    // Sanitize inputs
    $userName = $conn->real_escape_string(htmlspecialchars($userName, ENT_QUOTES, 'UTF-8'));
    $reviewTitle = $conn->real_escape_string(htmlspecialchars($reviewTitle, ENT_QUOTES, 'UTF-8'));
    $reviewText = $conn->real_escape_string(htmlspecialchars($reviewText, ENT_QUOTES, 'UTF-8'));
    $date = date('j M, Y');
    $avatar = 'https://i.pravatar.cc/50?img=' . rand(1, 70);
    
    // Insert into database
    $sql = "INSERT INTO testimonials (userName, title, rating, text, date, avatar, status) 
            VALUES (?, ?, ?, ?, ?, ?, 'approved')";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssisss", $userName, $reviewTitle, $reviewRating, $reviewText, $date, $avatar);
    
    if ($stmt->execute()) {
        $testimonialId = $stmt->insert_id;
        
        // Return the created testimonial
        $testimonial = [
            'id' => $testimonialId,
            'userName' => $userName,
            'title' => $reviewTitle,
            'rating' => $reviewRating,
            'text' => $reviewText,
            'date' => $date,
            'avatar' => $avatar,
            'status' => 'approved'
        ];
        
        echo json_encode(['success' => true, 'message' => 'Thank you for your testimonial!', 'testimonial' => $testimonial]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error saving testimonial to database. Please try again.']);
    }
    
    $stmt->close();
    $conn->close();
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>