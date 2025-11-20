<?php
require_once 'config.php';

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: admin_login.html');
    exit;
}

// Get inquiries count
$pdo = getDBConnection();
$stmt = $pdo->query("SELECT COUNT(*) as total FROM inquiries");
$total_inquiries = $stmt->fetch()['total'];

// Get recent inquiries
$stmt = $pdo->query("SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 10");
$recent_inquiries = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Aipri Lifesciences</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .sidebar {
            min-height: 100vh;
            background: #244F71;
        }
        .sidebar .nav-link {
            color: white;
            padding: 15px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .sidebar .nav-link:hover {
            background: rgba(255,255,255,0.1);
        }
        .stat-card {
            border-radius: 10px;
            border: none;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <nav class="col-md-3 col-lg-2 d-md-block sidebar collapse" style="background: #244F71;">
                <div class="position-sticky pt-3">
                    <h4 class="text-white text-center mb-4">Admin Dashboard</h4>
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link active" href="#">
                                <i class="fas fa-tachometer-alt me-2"></i>Dashboard
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" id="viewInquiries">
                                <i class="fas fa-envelope me-2"></i>Inquiries
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" id="exportData">
                                <i class="fas fa-download me-2"></i>Export Data
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" id="changePassword">
                                <i class="fas fa-key me-2"></i>Change Password
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="logout.php">
                                <i class="fas fa-sign-out-alt me-2"></i>Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <!-- Main content -->
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Dashboard</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <span class="me-3">Welcome, <?php echo $_SESSION['admin_username']; ?></span>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="row mb-4">
                    <div class="col-md-4">
                        <div class="card stat-card">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <h5 class="card-title">Total Inquiries</h5>
                                        <h2 class="text-primary"><?php echo $total_inquiries; ?></h2>
                                    </div>
                                    <div class="align-self-center">
                                        <i class="fas fa-envelope fa-2x text-primary"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Inquiries -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Recent Inquiries</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Message</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach($recent_inquiries as $inquiry): ?>
                                    <tr>
                                        <td><?php echo htmlspecialchars($inquiry['name']); ?></td>
                                        <td><?php echo htmlspecialchars($inquiry['email']); ?></td>
                                        <td><?php echo htmlspecialchars($inquiry['phone']); ?></td>
                                        <td><?php echo htmlspecialchars(substr($inquiry['message'], 0, 50)) . '...'; ?></td>
                                        <td><?php echo date('M j, Y', strtotime($inquiry['created_at'])); ?></td>
                                    </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <!-- Modals -->
    <div class="modal fade" id="inquiriesModal" tabindex="-1">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">All Inquiries</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="table table-striped" id="inquiriesTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="passwordModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Change Password</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="passwordForm">
                        <div class="mb-3">
                            <label for="currentPassword" class="form-label">Current Password</label>
                            <input type="password" class="form-control" id="currentPassword" required>
                        </div>
                        <div class="mb-3">
                            <label for="newPassword" class="form-label">New Password</label>
                            <input type="password" class="form-control" id="newPassword" required>
                        </div>
                        <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm New Password</label>
                            <input type="password" class="form-control" id="confirmPassword" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Change Password</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // View Inquiries
        document.getElementById('viewInquiries').addEventListener('click', function() {
            fetch('get_inquiries.php')
                .then(response => response.json())
                .then(data => {
                    const tbody = document.querySelector('#inquiriesTable tbody');
                    tbody.innerHTML = '';
                    data.forEach(inquiry => {
                        tbody.innerHTML += `
                            <tr>
                                <td>${inquiry.id}</td>
                                <td>${inquiry.name}</td>
                                <td>${inquiry.email}</td>
                                <td>${inquiry.phone}</td>
                                <td>${inquiry.message}</td>
                                <td>${new Date(inquiry.created_at).toLocaleDateString()}</td>
                            </tr>
                        `;
                    });
                    new bootstrap.Modal(document.getElementById('inquiriesModal')).show();
                });
        });

        // Export Data
        document.getElementById('exportData').addEventListener('click', function() {
            window.location.href = 'export_inquiries.php';
        });

        // Change Password
        document.getElementById('changePassword').addEventListener('click', function() {
            new bootstrap.Modal(document.getElementById('passwordModal')).show();
        });

        // Password Form Submission
        document.getElementById('passwordForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData();
            formData.append('current_password', document.getElementById('currentPassword').value);
            formData.append('new_password', document.getElementById('newPassword').value);
            formData.append('confirm_password', document.getElementById('confirmPassword').value);
            
            fetch('change_password.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    bootstrap.Modal.getInstance(document.getElementById('passwordModal')).hide();
                    document.getElementById('passwordForm').reset();
                }
            });
        });
    </script>
</body>
</html>