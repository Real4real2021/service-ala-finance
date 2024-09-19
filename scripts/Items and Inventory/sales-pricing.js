const inputDiv = document.getElementById("input-div");
const firstTable = document.getElementById("first-table");
const secondTable = document.getElementById("second-table");

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

renderInputs();
renderFirstTable();
renderSecondTable();
checkTables();

async function checkTables() {
  const response = await fetch("exec/create.php");
  const result = await response.json();
  console.log(result); // Log the result to see if tables were created successfully
  return result.success; // Assuming the PHP script returns a success property
}

function renderInputs() {
  let html = `
    <label for="item">Item:
            <input type="text" name="" id="item-code-input">
        </label>
        <select name="item-selector" id="item-selector">
            <option value="all-items">All Items</option>
        </select>
    `;

  inputDiv.innerHTML = html;
}

function renderFirstTable() {
  let html = `
    <table>
            <th>Currency</th>
            <th>Sales Type</th>
            <th>Price</th>
            <tbody id="tbody">
                
            </tbody>
        </table>
    `;
  firstTable.innerHTML = html;
}

function renderSecondTable() {
  let html = `
    <table>
            <tr>
                <td>Currency:</td>
                <td><input type="text" name="" id="currency-input"></td>
            </tr>
            <tr>
                <td>Sales Type:</td>
                <td><select name="" id="sales-type-selector"></select></td>
            </tr>
            <tr>
                <td>Price:</td>
                <td><input type="text" name="" id="price-input"></td>
            </tr>
        </table>
    `;
  secondTable.innerHTML = html;
}

const addNewButton = document.getElementById("add-new-button");
const currency = document.getElementById("currency-input");
const salesType = document.getElementById("sales-type-selector");
const price = document.getElementById("price-input");

addNewButton.addEventListener("click", () => {
  post("function/sales-pricing.php", {
    currency: currency.value,
    salesType: salesType.value,
    price: price.value
  }).then((Data) => {
    console.log(Data);
  });
});

const tableBody = document.querySelector("tbody");
async function readSalesPricing() {
  const response =await fetch("function/read-sales-pricing.php");
  const salesPricing = await response.json();

  salesPricing.forEach((salesPricing) => {
    let tr = `
          <tr>
              <td>${salesPricing.currency}</td>
              <td>${salesPricing.salesType}</td>
              <td>${salesPricing.price}</td>
          </tr>
        `;
    tableBody.innerHTML += tr;
  });
}

readSalesPricing();
