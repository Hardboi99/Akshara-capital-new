<?php
// backend/login.php - User Login API

require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Invalid request method. POST required.');
}

// Support both JSON body and standard Form POST
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';
$rememberMe = !empty($input['remember_me']);

// Validations
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse(false, 'Please enter a valid email address.', ['field' => 'email']);
}

if (empty($password)) {
    sendJsonResponse(false, 'Please enter your password.', ['field' => 'password']);
}

try {
    // Look up user by email
    $stmt = $pdo->prepare("SELECT id, full_name, email, phone, password_hash FROM users WHERE LOWER(email) = LOWER(:email) LIMIT 1");
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        sendJsonResponse(false, 'Invalid email or password. Please check your credentials.', ['field' => 'password']);
    }

    // Update last login timestamp
    $updateStmt = $pdo->prepare("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = :id");
    $updateStmt->execute([':id' => $user['id']]);

    // Store in session
    $_SESSION['user'] = [
        'id' => $user['id'],
        'name' => $user['full_name'],
        'email' => $user['email'],
        'phone' => $user['phone']
    ];

    // Optional Remember Me Cookie (30 days)
    if ($rememberMe) {
        $token = base64_encode($user['id'] . ':' . hash('sha256', $user['password_hash']));
        setcookie('akshara_remember', $token, time() + (30 * 86400), '/', '', false, true);
    }

    sendJsonResponse(true, 'Login successful! Redirecting...', [
        'redirect' => 'index.html',
        'user' => $_SESSION['user']
    ]);

} catch (Exception $e) {
    sendJsonResponse(false, 'Login failed due to a server error. Please try again.');
}
