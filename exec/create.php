<?php
require_once("../config/db_con.php");

// Create invoices table
$createInvoicesTable = "
CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoiceNumber VARCHAR(25) NOT NULL,
    invoiceDate DATE NOT NULL,
    dueDate DATE NOT NULL,
    clientName VARCHAR(25) NOT NULL,
    clientAddress TEXT NOT NULL,
    clientContact VARCHAR(25),
    notes TEXT,
    itemDescription TEXT,
    quantity INT NOT NULL,
    unitPrice DECIMAL(10, 2) NOT NULL
)";

mysqli_query($con, $createInvoicesTable) or die(mysqli_error($con));

// Create item_inventory table
$createItemInventoryTable = "
CREATE TABLE IF NOT EXISTS item_inventory (
    item_code VARCHAR(25) PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    description TEXT,
    category VARCHAR(25),
    item_tax_type VARCHAR(25),
    item_type VARCHAR(25),
    unit_of_measure VARCHAR(25),
    editable_description TEXT,
    exclude_from_sales BOOLEAN DEFAULT FALSE,
    exclude_from_purchases BOOLEAN DEFAULT FALSE,
    dimensions VARCHAR(25),
    sales_account VARCHAR(25),
    inventory_account VARCHAR(25),
    cogs_account VARCHAR(25),
    inventory_adjustment_account VARCHAR(25)
)";

mysqli_query($con, $createItemInventoryTable) or die(mysqli_error($con));

// Create customers table
$createCustomersTable = "
CREATE TABLE IF NOT EXISTS customers (
    primaryId INT AUTO_INCREMENT PRIMARY KEY,
    customerName VARCHAR(25) NOT NULL,
    customerShortName VARCHAR(25),
    customerAddress TEXT,
    GSTNo VARCHAR(25),
    customerCurrency VARCHAR(25),
    salesType VARCHAR(25),
    phone VARCHAR(25),
    secondaryPhoneNumber VARCHAR(25),
    email VARCHAR(25),
    bankAccountNumber VARCHAR(25),
    salesPerson VARCHAR(25),
    discountPercent DECIMAL(5, 2),
    promptPaymentDiscountPercent DECIMAL(5, 2),
    creditLimit DECIMAL(10, 2),
    paymentTerms VARCHAR(25),
    generalNotes TEXT,
    defaultInventoryLocation VARCHAR(25),
    defaultShippingCompany VARCHAR(25),
    salesArea VARCHAR(25),
    taxGroup VARCHAR(25)
)";

mysqli_query($con, $createCustomersTable) or die(mysqli_error($con));

// Create branches table
$createBranchesTable = "
CREATE TABLE IF NOT EXISTS branches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shortName VARCHAR(25),
    branchName VARCHAR(25) NOT NULL,
    contact VARCHAR(25),
    salesPerson VARCHAR(25),
    area VARCHAR(25),
    phoneNo VARCHAR(25),
    email VARCHAR(25),
    taxGroup VARCHAR(25)
)";

mysqli_query($con, $createBranchesTable) or die(mysqli_error($con));

// Create sales_order_entries table
$createSalesOrderEntriesTable = "
CREATE TABLE IF NOT EXISTS sales_order_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    referance VARCHAR(25) NOT NULL,
    itemCode VARCHAR(25) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    unit VARCHAR(25),
    priceAfterTax DECIMAL(10, 2),
    discount DECIMAL(5, 2)
)";

mysqli_query($con, $createSalesOrderEntriesTable) or die(mysqli_error($con));

// Create customer_payments table
$createCustomerPaymentsTable = "
CREATE TABLE IF NOT EXISTS customer_payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer VARCHAR(25) NOT NULL,
    branch VARCHAR(25),
    bankAccount VARCHAR(25),
    transactionDate DATE NOT NULL,
    referance VARCHAR(25),
    bankCharge DECIMAL(10, 2),
    dimensions VARCHAR(25),
    paymentDiscount DECIMAL(5, 2),
    discountAmount DECIMAL(10, 2),
    memo TEXT
)";

mysqli_query($con, $createCustomerPaymentsTable) or die(mysqli_error($con));

// Create direct_delivery table
$createDirectDeliveryTable = "
CREATE TABLE IF NOT EXISTS direct_delivery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    referance VARCHAR(25) NOT NULL,
    itemCode VARCHAR(25) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    unit VARCHAR(25),
    priceAfterTax DECIMAL(10, 2),
    discount DECIMAL(5, 2)
)";

mysqli_query($con, $createDirectDeliveryTable) or die(mysqli_error($con));

// Create direct_invoice table
$createDirectInvoiceTable = "
CREATE TABLE IF NOT EXISTS direct_invoice (
    id INT AUTO_INCREMENT PRIMARY KEY,
    referance VARCHAR(25) NOT NULL,
    itemCode VARCHAR(25) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    unit VARCHAR(25),
    priceAfterTax DECIMAL(10, 2),
    discount DECIMAL(5, 2)
)";

mysqli_query($con, $createDirectInvoiceTable) or die(mysqli_error($con));

$createSalesQuotationEntriesTable = "
CREATE TABLE IF NOT EXISTS sales_quotation_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    referance VARCHAR(25) NOT NULL,
    itemCode VARCHAR(25) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    unit VARCHAR(25),
    priceAfterTax DECIMAL(10, 2),
    discount DECIMAL(5, 2),
    customer VARCHAR(25),
    branch VARCHAR(25),
    payment VARCHAR(25),
    priceList VARCHAR(25),
    date DATE
)";

mysqli_query($con, $createSalesQuotationEntriesTable) or die(mysqli_error($con));

$createPurchaseOrderEntriesTable = "
CREATE TABLE IF NOT EXISTS purchase_order_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    referance VARCHAR(25) NOT NULL,
    supplierReference VARCHAR(25),
    dimensions VARCHAR(25),
    receiveInto VARCHAR(25),
    deliverTo VARCHAR(25),
    itemCode VARCHAR(25) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    unit VARCHAR(25),
    requiredDeliveryDate DATE,
    priceBeforeTax DECIMAL(10, 2),
    supplier VARCHAR(25),
    exchangeRate VARCHAR(25),
    date DATE
)";

mysqli_query($con, $createPurchaseOrderEntriesTable) or die(mysqli_error($con));

// Close the database connection
mysqli_close($con);
echo json_encode("Tables created successfully.");
?>