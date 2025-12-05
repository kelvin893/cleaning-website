<?php
// admin_testimonials.php - Simple admin panel to view all testimonials
include 'db_config.php';

$sql = "SELECT * FROM testimonials ORDER BY created_at DESC";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Testimonials Admin</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .approved { color: green; }
        .pending { color: orange; }
    </style>
</head>
<body>
    <h1>Testimonials Admin Panel</h1>
    <p>Total Testimonials: <?php echo $result->num_rows; ?></p>
    
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Title</th>
            <th>Rating</th>
            <th>Text</th>
            <th>Date</th>
            <th>Status</th>
            <th>Created At</th>
        </tr>
        <?php while($row = $result->fetch_assoc()): ?>
        <tr>
            <td><?php echo $row['id']; ?></td>
            <td><?php echo htmlspecialchars($row['userName']); ?></td>
            <td><?php echo htmlspecialchars($row['title']); ?></td>
            <td><?php echo $row['rating']; ?> ★</td>
            <td><?php echo htmlspecialchars($row['text']); ?></td>
            <td><?php echo $row['date']; ?></td>
            <td class="<?php echo $row['status']; ?>"><?php echo $row['status']; ?></td>
            <td><?php echo $row['created_at']; ?></td>
        </tr>
        <?php endwhile; ?>
    </table>
</body>
</html>
<?php $conn->close(); ?>