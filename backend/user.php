<?php
// backend/user.php - Check Current Session User API

require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

if (!empty($_SESSION['user'])) {
    echo json_encode([
        'logged_in' => true,
        'user' => $_SESSION['user']
    ]);
} else {
    // Check remember me cookie fallback
    if (!empty($_COOKIE['akshara_remember'])) {
        $parts = explode(':', base64_decode($_COOKIE['akshara_remember']));
        if (count($parts) === 2) {
            $userId = (int)$parts[0];
            $expectedHash = $parts[1];

            try {
                $stmt = $pdo->prepare("SELECT id, full_name, email, phone, password_hash FROM users WHERE id = :id LIMIT 1");
                $stmt->execute([':id' => $userId]);
                $user = $stmt->fetch();

                if ($user && hash('sha256', $user['password_hash']) === $expectedHash) {
                    $_SESSION['user'] = [
                        'id' => $user['id'],
                        'name' => $user['full_name'],
                        'email' => $user['email'],
                        'phone' => $user['phone']
                    ];
                    echo json_encode([
                        'logged_in' => true,
                        'user' => $_SESSION['user']
                    ]);
                    exit;
                }
            } catch (Exception $e) {}
        }
    }

    echo json_encode([
        'logged_in' => false,
        'user' => null
    ]);
}
