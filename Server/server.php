<?php
// header("Content-Type: application/json");

// $filename = "rockets.json";

// if ($_SERVER["REQUEST_METHOD"] === "POST") {
//     $data = json_decode(file_get_contents("php://input"), true);

//     if ($data["command"] === "save") {
//         $rockets = file_exists($filename) ? json_decode(file_get_contents($filename), true) : [];
//         $rockets[] = $data["config"];
//         file_put_contents($filename, json_encode($rockets, JSON_PRETTY_PRINT));
//         echo json_encode(["status" => "success", "message" => "Rocket saved!"]);
//         exit;
//     }
// }

// if ($_GET["command"] === "load") {
//     if (file_exists($filename)) {
//         echo file_get_contents($filename);
//     } else {
//         echo json_encode([]);
//     }
//     exit;
// }

// echo json_encode(["status" => "error", "message" => "Invalid command"]);




// header("Content-Type: application/json");

// $filename = "rockets.json";
// if (file_exists($filename)) {
//     echo file_get_contents($filename);
// } else {
//     echo json_encode([]);
// }

?>