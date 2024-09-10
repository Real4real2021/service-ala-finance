// Get references to HTML elements
const invoiceForm = document.querySelector(".invoice-form");
const addItemBtn = document.getElementById("add-item");
const invoiceItemsContainer = document.getElementById("invoice-items");
const invoiceItemsTable = document.querySelector(".invoice-items table tbody");

//INPUT FIELD DIV
const itemDescip = document.querySelector(".item");
const quantityInput = document.querySelector(".quantity");
const unitPrice = document.querySelector(".unit-price");
const submitButton = document.querySelector(".submit-button");
//INPUT FIELD DIV

//INVOICE FIELD DIV
const invNumber = document.getElementById("invoice-number");
const invDate = document.getElementById("invoice-date");
const dueDate = document.getElementById("due-date");
//INVOICE FIELD DIV

//CLIENT DATA DIV
const clientName = document.getElementById("client-name");
const clientAddress = document.getElementById("client-address");
const clientContact = document.getElementById("client-contact");
const invNotes = document.getElementById("invoice-notes");
//CLIENT DATA DIV

const table = document.querySelector(".table-body");

// function loading(){
//   console.log("loading");
// }

// let skipLoading = false;

// async function post(url, data, options = {}) {
//   const { timeout = 8000 } = options;
//   const controller = new AbortController();
//   const id = setTimeout(() => controller.abort(), timeout);

//   try {
//     const response = await fetch(url, {
//       signal: controller.signal,
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       ...options,
//       body: JSON.stringify(data)
//     });

//     clearTimeout(id); // Clear timeout after successful response

//     if (!url.includes('notifications') && !skipLoading) {
//       loading(); // Call loading only once
//     }

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return response.json();
//   } catch (error) {
//     if (error.name === 'AbortError') {
//       console.log('Request timed out');
//     } else {
//       console.error('Error:', error);
//     }
//     return null; // Or handle error as needed
//   } finally {
//     if (!skipLoading) skipLoading = false; // Reset skipLoading consistently
//   }
// }

// async function post(url, data, options = {}) {
//     const { timeout = 8000 } = options;
//     const controller = new AbortController();
//     const id = setTimeout(() => controller.abort(), timeout);
//     if (!url.includes('notifications')) {
//         if (!skipLoading) loading();
//         const responseText = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             ...options,
//             body: JSON.stringify(data)
//         });
//         clearTimeout(id);
//         if (!skipLoading) loading();
//         if (skipLoading) skipLoading = false;
//   //       return rewsponseText.json();
//     }
//     const responseText = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data),
//     }).catch((error) => {
//         console.log(error);
//     });
//     if (skipLoading) skipLoading = false;
//     return responseText.json();
//   }

let tableData = [
  {
    itemDescip: "perscriptio lense with frame",
    quantityInput: 234,
    unitPrice: 12,
  },
  {
    itemDescip: "frame no lense",
    quantityInput: 35,
    unitPrice: 5,
  },
  {
    itemDescip: "lense no frame",
    quantityInput: 563,
    unitPrice: 21,
  },
];

addItemBtn.addEventListener('click', () => {
  tableData.push({
    invoiceNumber: invNumber.value,
    invoiceDate: invDate.value,
    dueDate: dueDate.value,
    clientName: clientName.value,
    clientAddress: clientAddress.value,
    clientContact: clientContact.value,
    invNotes: invNotes.value,
    itemDescip: itemDescip.value,
    quantityInput: quantityInput.value,
    unitPrice: unitPrice.value,
  });
  console.log(tableData);

  fetch('function/invoice.php', {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tableData)
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.succes) {
        console.log("Data submitted successfully!");
      } else {
        console.log("Error submitting data:")+error;
      }
    })
    .catch((error) => {
      console.error("Error"+error);
    });
});


// Function to create a new invoice item row
function createInvoiceItem() {
  let tableHTML;
  const itemRow = document.createElement("div");
  // itemRow.classList.add("invoice-item");

  // Add elements to itemRow

  invoiceItemsTable.appendChild(itemRow);

  const newRow = document.createElement("tr");

  // Create table cells for item description, quantity, unit price, and total price
  // const itemCell = document.createElement("td");
  // const quantityCell = document.createElement("td");
  // const priceCell = document.createElement("td");
  // const totalCell = document.createElement("td");

  tableData.forEach((data) => {
    tableHTML += `
    <tr>
      <td>${data.itemDescip}</td>
      <td>${data.quantityInput}</td>
      <td>${data.unitPrice}</td>
      <td>${data.unitPrice * data.quantityInput}</td>
      <input type="button" class="delete-button" value="Delete">
    </tr>
    ${console.log(data.unitPrice)}
    `;
  });

  document.querySelector(".table-body").innerHTML = tableHTML;

  // Create input elements for item description, quantity, and unit price
  // const itemInput = document.createElement("input");
  // itemInput.type = "text";
  // itemInput.placeholder = "Item Description";

  // const quantityInput = document.createElement("input");
  // quantityInput.type = "number";
  // quantityInput.value = "1";

  // const priceInput = document.createElement("input");
  // priceInput.type = "number";
  // priceInput.step = "0.01";
  // priceInput.placeholder = "Unit Price";

  // Append input elements to their respective cells
  // itemCell.appendChild(itemInput);
  // quantityCell.appendChild(quantityInput);
  // priceCell.appendChild(priceInput);

  // Calculate and display total price
  const calculateTotal = () => {
    const quantity = parseFloat(quantityInput.value) || 0;
    const price = parseFloat(priceInput.value) || 0;
    const total = quantity * price;
    totalCell.textContent = total.toFixed(2);
  };

  // quantityInput.addEventListener("input", calculateTotal);
  // priceInput.addEventListener("input", calculateTotal);

  // calculateTotal();

  // Append cells to the new row
  // newRow.appendChild(itemCell);
  // newRow.appendChild(quantityCell);
  // newRow.appendChild(priceCell);
  // newRow.appendChild(totalCell);

  // Append the new row to the invoice items table
  invoiceItemsTable.appendChild(newRow);

  // quantityInput.addEventListener("input", (event) => {
  //   calculateTotal();
  //   calculateTotals();
  // });

  // priceInput.addEventListener("input", (event) => {
  //   calculateTotal();
  //   calculateTotals();
  // });

  // Create a delete button

  // Append delete button to the item row
  // newRow.appendChild(deleteBtn);
  tableData.forEach((data) => {
    document
      .querySelector(".delete-button")
      .addEventListener("click", (event) => {
        const itemRow = event.target.parentNode;
        itemRow.remove();
        calculateTotals();
        console.log("deleted");
      });
  });
}

createInvoiceItem();

// Functions for calculating totals, saving invoices, sending invoices, etc.

function calculateTotals() {
  const itemRows = document.querySelectorAll(".invoice-item");
  let subtotal = "";

  itemRows.forEach((row) => {
    const totalCell = row.querySelector("td:last-child");
    if (totalCell) {
      subtotal += parseFloat(totalCell.textContent);
    } else {
      console.log("no total cell");
    }
  });

  // Assuming a 10% tax rate for demonstration purposes
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  // document.getElementById("tax").textContent = tax.toFixed(2);
  // document.getElementById("total").textContent = total.toFixed(2);
}

// Call calculateTotals after creating a new item
addItemBtn.addEventListener("click", () => {
  createInvoiceItem();
  calculateTotals();
});
