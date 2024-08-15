<?php
// Database connection details
$servername = "127.0.0.1";
$username = "";
$password = "";
$dbname = "serviec_de_financea";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get data from the form
    $invoice_number = $_POST['invoice_number'];
    $invoice_date = $_POST['invoice_date'];
    $due_date=$_POST['due_date'];
    $clientName = $_POST['clientAddress'];
    $clientContact = $_POST['client_contact'];
    $notes = $_POST['item_description'];
    $quantity = $_POST['unit_price'];
    $total = $_POST['total'];

    // Prepare and execute SQL statement to insert data
    $sql = "INSERT INTO invoices (invoiceNumber, invoiceDate, dueDate, clientName, clientAddress, clientContact, notes, itemDescription, quantity, unitPrice, total) VALUES ('invoice_number', 'invoice_date', 'due_date', 'client_address', 'client_contact', 'item_desctiption', 'unit_price', 'total')";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param($invoice_number, $invoice_date);
    $stmt->execute();

    // Handle success or failure
    if ($stmt->error) {
        // Error handling
    } else {
        // Success, maybe return a JSON response or redirect
        echo json_encode(['success' => true]);
    }

    $stmt->close();
}

$conn->close();
