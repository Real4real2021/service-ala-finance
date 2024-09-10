<?php require_once('../config/db_con.php');

if(isset($_POST['customer'])) {
    $customer = mysqli_real_escape_string($con, $_POST["customer"]);
    $branch = mysqli_real_escape_string($con, $_POST["branch"]);
    $bankAccount = mysqli_real_escape_string($con, $_POST["bankAccount"]);
    $date = mysqli_real_escape_string($con, $_POST["date"]);
    $referance = mysqli_real_escape_string($con, $_POST["referance"]);
    $bankCharge = mysqli_real_escape_string($con, $_POST["referance"]);
}