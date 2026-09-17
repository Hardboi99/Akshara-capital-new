<?php
// backend/register.php - User Registration API

require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Invalid request method. POST required.');
}

// Support both JSON body and standard Form POST
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$fullName = trim($input['full_name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$password = $input['password'] ?? '';
$confirmPassword = $input['confirm_password'] ?? $password;

// Validations
if (empty($fullName)) {
    sendJsonResponse(false, 'Please enter your full name.', ['field' => 'full_name']);
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse(false, 'Please provide a valid email address.', ['field' => 'email']);
}

if (strlen($password) < 6) {
    sendJsonResponse(false, 'Password must be at least 6 characters long.', ['field' => 'password']);
}

if ($password !== $confirmPassword) {
    sendJsonResponse(false, 'Passwords do not match.', ['field' => 'confirm_password']);
}

try {
    // Check if email already registered
    $stmt = $pdo->prepare("SELECT id FROM users WHERE LOWER(email) = LOWER(:email) LIMIT 1");
    $stmt->execute([':email' => $email]);
    if ($stmt->fetch()) {
        sendJsonResponse(false, 'An account with this email already exists. Please sign in.', ['field' => 'email']);
    }

    // Securely hash password
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    // Insert user into database
    $insertStmt = $pdo->prepare("INSERT INTO users (full_name, email, phone, password_hash) VALUES (:name, :email, :phone, :hash)");
    $insertStmt->execute([
        ':name' => $fullName,
        ':email' => strtolower($email),
        ':phone' => $phone,
        ':hash' => $passwordHash
    ]);

    $userId = $pdo->lastInsertId();

    // Log the user in via session
    $_SESSION['user'] = [
        'id' => $userId,
        'name' => $fullName,
        'email' => strtolower($email),
        'phone' => $phone
    ];

    sendJsonResponse(true, 'Account created successfully! Redirecting...', [
        'redirect' => 'index.html',
        'user' => $_SESSION['user']
    ]);

} catch (Exception $e) {
    sendJsonResponse(false, 'Registration failed due to a server error. Please try again.');
}
