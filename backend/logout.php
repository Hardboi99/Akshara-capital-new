<?php
// backend/logout.php - Logout Handler

require_once __DIR__ . '/config.php';

$_SESSION = [];

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

session_destroy();

if (isset($_COOKIE['akshara_remember'])) {
    setcookie('akshara_remember', '', time() - 3600, '/');
}

// Redirect or return JSON
if (isset($_GET['ajax']) || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)) {
    sendJsonResponse(true, 'Logged out successfully.', ['redirect' => 'sign-in.html']);
} else {
    header("Location: ../sign-in.html");
    exit;
}
