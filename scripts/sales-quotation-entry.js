const inputDiv = document.querySelector(".first-quarter");
const itemsTable = document.querySelector(".second-quarter");
const newselector = document.querySelector(".new-selector");
const inputRow = document.querySelector(".input-row");
const deliveryLocationSelector = document.getElementById("location");
const cashAccountSelector = document.getElementById("cash-account-selector");
const comments = document.getElementById("comments");
const placeQuotationButton = document.getElementById("place-quotation-button");
const cancelQuotationButton = document.getElementById(
  "cancel-quotation-button"
);

function loading() {
  console.log("loading");
}

let skipLoading = false;

async function post(url, data, options = {}) {
  const { timeout = 8000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  if (!url.includes("notifications")) {
    if (!skipLoading) loading();
    const responseText = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      ...options,
      body: JSON.stringify(data),
    });
    clearTimeout(id);
    if (!skipLoading) loading();
    if (skipLoading) skipLoading = false;
    return responseText.json();
  }
  const responseText = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((error) => {
    console.log(error);
  });
  if (skipLoading) skipLoading = false;
  return responseText.json();
}

checkTables();

renderInputFeilds();

let innerOptions = "";
async function customerSelectorOptions() {
  const response = await fetch("function/read-and-manage-customers.php");
  const customers = await response.json();

  customers.forEach((customer) => {
    let options = `
        <option value="${customer.name}">${customer.name}</option> 
        `;

    innerOptions += options;
  });
  console.log(innerOptions);
  const customerSelectorElement = document.getElementById("customer-selector");
  customerSelectorElement.innerHTML = innerOptions;
}

customerSelectorOptions();

let secondInnerOption = "";

async function productSelectorOptions() {
  const response = await fetch("function/read-item.php");
  const items = await response.json();

  items.forEach((item) => {
    let options = `
          <option value="${item.name}">${item.name}</option> 
          `;

    secondInnerOption += options;
  });
  const descriptionElement = document.getElementById("description");
  descriptionElement.innerHTML = secondInnerOption;
}

let thirdInnerOption = "";

async function branchSelectorOptions() {
  const response = await fetch("function/read-and-manage-branches.php");
  const branches = await response.json();

  branches.forEach((branch) => {
    let options = `
          <option value="${branch.branchName}">${branch.branchName}</option> 
          `;
    thirdInnerOption += options;
  });
  const branchSelector = document.getElementById("branch-selector");
  branchSelector.innerHTML = thirdInnerOption;
}

async function checkTables() {
  const response = await fetch("exec/create.php");
  const result = await response.json();
  console.log(result); // Log the result to see if tables were created successfully
  return result.success; // Assuming the PHP script returns a success property
}

branchSelectorOptions();

const reference = document.getElementById("reference");

renderItemsTable();

const addItemButton = document.querySelector(".add-item-button");
const itemCodeInupt = document.getElementById("item-code");
const descriptionSelector = document.getElementById("description");
const quantityInput = document.getElementById("quantity");
const priceAfterTaxInput = document.getElementById("price-taxed");
const discountInput = document.getElementById("discount");
const totalCell = document.getElementById("total-cell");
const customerSelector = document.getElementById("customer-selector");
const branchSelector = document.getElementById("branch-selector");
const referenceInput = document.getElementById("reference");
const currentCreditElement = document.getElementById("current-credit");
const paymentSelector = document.getElementById("payment");
const priceListSelector = document.getElementById("price-list");
const dateInput = document.getElementById("quotation-date");
const table = document.querySelector(".table");
const unitCell = document.getElementById("unit-cell");

// placeQuotationButton.addEventListener('click', () => {
//     console.log(reference.value);
// });

const salesQuotationInvoice = [];

let HTML = "";
addItemButton.addEventListener("click", () => {
  salesQuotationInvoice.push({
    referance: referenceInput.value,
    itemCode: itemCodeInupt.value,
    description: descriptionSelector.value,
    quantity: quantityInput.value,
    unit: 'each',
    priceAfterTax: priceAfterTaxInput.value,
    discount: discountInput.value,
    customer: customerSelector.value,
    branch: branchSelector.value,
    payment: paymentSelector.value,
    priceList: priceListSelector.value,
    date: dateInput.value
  });

  // console.log(salesQuotationInvoice)

  const newRowHTML = `
      <tr class="align-right">
          <td>${
            salesQuotationInvoice[salesQuotationInvoice.length - 1].itemCode
          }</td>
          <td>${
            salesQuotationInvoice[salesQuotationInvoice.length - 1].description
          }</td>
          <td>${
            salesQuotationInvoice[salesQuotationInvoice.length - 1].quantity
          }</td>
          <td></td>
          <td>${
            salesQuotationInvoice[salesQuotationInvoice.length - 1]
              .priceAfterTax
          }</td>
          <td>${
            salesQuotationInvoice[salesQuotationInvoice.length - 1].discount
          }</td>
      </tr>
  `;

  // Create a new table row element
  const newTr = document.createElement("tr");
  newTr.innerHTML = newRowHTML;

  // Get the table body and insert the new row after the first row
  const tableBody = table.querySelector("tbody");
  const firstRow = tableBody.querySelector("tr"); // Get the first row
  tableBody.insertBefore(newTr, firstRow.nextSibling);
});

placeQuotationButton.addEventListener("click", () => {
  const groupedData = salesQuotationInvoice.reduce((acc, item) => {
    if (!acc[item.referance]) {
      acc[item.referance] = []; // Create a new array for this referance
    }
    acc[item.referance].push({
      itemCode: item.itemCode,
      description: item.description,
      quantity: item.quantity,
      unit:item.unit,
      priceAfterTax: item.priceAfterTax,
      discount: item.discount,
      customer: item.customer,
      branch: branchSelector.value,
      payment: paymentSelector.value,
      priceList: priceListSelector.value,
      date: dateInput.value
    });
    return acc;
  }, {});

  // Prepare the data to be sent to the PHP script
  const dataToSend = {
    referance: Object.keys(groupedData), // Get the referances
    items: groupedData, // Grouped items
  };

  post("function/sales-quotation-entry.php", dataToSend).then((Data) => {
    console.log(Data);
  });
});

function renderInputFeilds() {
  let HTML = `
    <h1>New Sales Quotation Entry</h1>
    <div class="customer-info">
            <label for="customer-selector">
                Customer:
                <select name="customer-selector" id="customer-selector">
                    
                </select> </label><br />
            <label for="branch-selector">Branch:
                <select name="branch-selector" id="branch-selector">
                    
                </select> </label><br />
            <label for="reference">
                Reference:
                <input type="text" name="reference" id="reference" />
            </label>
        </div>
    
        <div class="credit-and-discount">
            <label for="current-credit">Current Credit: R 1000
            </label><br />
            <label for="customer-discount">Customer Discount: 0%</label>
        </div>
        <div class="payment-and-price-list">
            <label for="payment">Payment:
                <select name="payment" id="payment">
                    <option value="Cash Only">Cash Only</option>
                    <option value="Due by 15th of the following month">
                        Due by 15th of the following month
                    </option>
                    <option value="Due by 15th of the following month">
                        Due by 15th of the following month
                    </option>
                    <option value="Due By The End Of The Following Month">
                        Due By The End Of The Following Month
                    </option>
                    <option value="Payment Due Within 10 Days">
                        Payment Due Within 10 Days
                    </option>
                    <option value="Prepaid">Prepaid</option>
                </select> </label><br />
            <label for="price-list">Price List:
                <select name="price-list" id="price-list">
                    <option value="Retail">Retail</option>
                    <option value="Wholesale">Wholesale</option>
                </select>
            </label>
        </div>
        <div class="quotation-date">
            <label for="quotation-date">Quotation Date:
                <input type="date" name="quotation-date" id="quotation-date" />
            </label>
        </div>
    `;
  inputDiv.innerHTML = HTML;
}

function renderItemsTable() {
  let HTML = `
    <h2>Sales Quotation Items</h2>
    <table class="table">
            <th>Item Code</th>
            <th>Item Description</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Price after Tax</th>
            <th>Discount %</th>
            <th>Total</th>
            <tbody>
                <tr>
                    <td>
                        <input type="text" name="" id="item-code">
                    </td>
                    <td>
                            <select name="Description" id="description">
                            <option value="Products in Inventory">Products in Inventory</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" name="Quantity" id="quantity">
                    </td>
                    <td id="unit-cell">
                        each
                    </td>
                    <td>
                        <input type="text" name="price-taxed" id="price-taxed">
                    </td>
                    <td>
                        <input type="text" name="Discount" id="discount">
                    </td>
                    <td id="total-cell">
                        0.00
                    </td>
                    <td>
                        <input type="button" class="add-item-button" value="Add Item">
                    </td>
                </tr>
                <tr>
                    <td class="align-right" colspan="6">
                        Shipping Charge
                    </td>
                    <td>
                        <input type="text" name="charge-amount" id="charge-amount">
                    </td>
                </tr>
                <tr>
                    <td class="align-right" colspan="6">
                        Sub-total
                    </td>
                    <td class="align-right">
                        0.00
                    </td>
                </tr>
                <tr>
                    <td class="align-right" colspan="6">
                        Amount Total
                    </td>
                    <td class="align-right">
                        0.00
                    </td>
                    <td>
                        <input type="button" value="Update">
                    </td>
                </tr>
            </tbody>
        </table>
    `;
  itemsTable.innerHTML = HTML;
}
