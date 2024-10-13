<?php
// Load the current squares' data
$squaresData = file_exists('squares.txt') ? json_decode(file_get_contents('squares.txt'), true) : [];

// Get the square ID and new color from the request
if (isset($_GET['id']) && isset($_GET['color'])) {
    $id = $_GET['id'];
    $color = $_GET['color'];

    // Update the color for the specific square ID
    $squaresData[$id] = $color;

    // Save the updated data back to the file
    file_put_contents('squares.txt', json_encode($squaresData));
}
?>
