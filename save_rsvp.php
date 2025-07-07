<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $file = fopen("rsvps.csv", "a");

    $fullname = $_POST['fullname'] ?? '';
    $attending = $_POST['attending'] ?? '';
    $number = $_POST['number'] ?? '';
    $attendees = $_POST['attendees'] ?? '';
    $message = $_POST['message'] ?? '';
    $timestamp = date("Y-m-d H:i:s");

    fputcsv($file, [$timestamp, $fullname, $attending, $number, $attendees, $message]);
    fclose($file);

    echo "<p style='color:white; text-align:center;'>Thank you! Your RSVP has been received.</p>";
}
?>
