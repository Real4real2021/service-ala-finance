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

const reference = document.getElementById("reference");

renderItemsTable();
const addItemButton = document.querySelector(".add-item-button");
const itemCodeInupt = document.getElementById("item-code");
const descriptionSelector = document.getElementById("description");
const quantityInput = document.getElementById("quantity");
const priceAfterTaxInput = document.getElementById("price-taxed");
const discountInput = document.getElementById("discount");
const totalCell = document.getElementById("total-cell");
const table = document.querySelector(".table");

// placeQuotationButton.addEventListener('click', () => {
//     console.log(reference.value);
// });

const salesQuotationInvoice = [];

let HTML = "";
addItemButton.addEventListener("click", () => {
  salesQuotationInvoice.push({
    referance: reference.value,
    itemCode: itemCodeInupt.value,
    description: descriptionSelector.value,
    quantity: quantityInput.value,
    priceAfterTax: priceAfterTaxInput.value,
    discount: discountInput.value,
  });

  // console.log(salesQuotationInvoice)

  salesQuotationInvoice.forEach((item) => {
    HTML = `
        <tr class="align-right">
            <td>${item.itemCode}</td>
            <td>${item.description}</td>
            <td>${item.quantity}</td>
            <td></td>
            <td>${item.priceAfterTax}</td>
            <td>${item.discount}</td>
        </tr>
        `;
  });

  const newTr = document.createElement("tr");
  newTr.innerHTML = HTML;
  table.append(newTr);
});

placeQuotationButton.addEventListener("click", () => {
  post("function/sales-quotation-entry.php", {
    reference: reference.value,
    itemCode: itemCodeInupt.value,
    description: descriptionSelector.value,
    quantity: quantityInput.value,
    priceAfterTax: priceAfterTaxInput.value,
    discount: discountInput.value,
  }).then((Data) => {
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
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select> </label><br />
            <label for="branch-selector">Branch:
                <select name="branch-selector" id="branch-selector">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
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
                    <td>
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
