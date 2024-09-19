const inputDiv = document.getElementById("first-div");
const tableDiv = document.getElementById("items-table");

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
renderTable();
checkTables();

async function checkTables() {
  const response = await fetch("exec/create.php");
  const result = await response.json();
  console.log(result); // Log the result to see if tables were created successfully
  return result.success; // Assuming the PHP script returns a success property
}

function renderInputs() {
  let html = `
    <div id="from-location">
            <label for="from-location">From Location:
                <select id="from-location-selector"></select>
            </label><br>
            <label for="to-location">To Location:
                <select name="" id="to-location-selector"></select>
            </label>
        </div>
        <div id="date">
            <label for="date">Date:
                <input type="date" name="" id="date-input">
            </label><br>
            <label for="reference">Reference:
                <input type="text" name="" id="reference-input">
            </label>
        </div>
    `;
  inputDiv.innerHTML = html;
}

function renderTable() {
  let html = `
    <h2>Items</h2>
        <table class="table">
            <th>Items Code</th>
            <th>Items Description</th>
            <th>Quantity</th>
            <th>Unit</th>
            <tbody>
                <tr>
                    <td><input type="text" name="" id="item-code-input"></td>
                    <td><select name="" id="inventory-item-selector"></select></td>
                    <td><input type="text" name="" id="quantity-input"></td>
                    <td>each</td>
                    <td><input type="button" value="Add Item" id="add-item-button"></td>
                </tr>
            </tbody>
        </table>
    `;
  tableDiv.innerHTML = html;
}

const table = document.querySelector("table");
const fromLocationSelector = document.getElementById("from-location-selector");
const toLocationSelector = document.getElementById("to-location-selector");
const dateInput = document.getElementById("date-input");
const referenceInput = document.getElementById("reference-input");
const itemCodeInput = document.getElementById("item-code-input");
const inventoryItemSelector = document.getElementById(
  "inventory-item-selector"
);
const quantityInput = document.getElementById("quantity-input");
const addItemButton = document.getElementById("add-item-button");
const processTransferButton = document.getElementById(
  "process-transfer-button"
);

const items = [];

addItemButton.addEventListener("click", () => {
  items.push({
    from: fromLocationSelector.value,
    to: toLocationSelector.value,
    date: dateInput.value,
    reference: referenceInput.value,
    itemCode: itemCodeInput.value,
    inventoryItem: inventoryItemSelector.value,
    quantity: quantityInput.value,
    unit: "each",
  });

  const newRowHTML = `
      <tr class="align-right">
          <td>${items[items.length - 1].itemCode}</td>
          <td>${items[items.length - 1].inventoryItem}</td>
          <td>${items[items.length - 1].quantity}</td>
          <td>
            ${items[items.length - 1].unit}
          </td>
      </tr>
  `;

  // Create a new table row element
  const newTr = document.createElement("tr");
  newTr.innerHTML = newRowHTML;

  // Get the table body and insert the new row after the first row
  const tableBody = table.querySelector("tbody");
  const firstRow = tableBody.querySelector("tr"); // Get the first row
  tableBody.insertBefore(newTr, firstRow.nextSibling);

  itemCodeInput.value = "";
  inventoryItemSelector.value = "";
  quantityInput.value = "";
  fromLocationSelector.value = "";
  toLocationSelector.value = "";
  dateInput.value = "";
  referenceInput.value = "";
});

processTransferButton.addEventListener("click", () => {
  const groupedData = items.reduce((acc, item) => {
    if (!acc[items.reference]) {
      acc[items.reference] = []; // Create a new array for this reference
    }
    acc[items.reference].push({
      from: items.from,
      to: items.to,
      date: items.date,
      itemCode: items.itemCode,
      inventoryItem: items.inventoryItem,
      quantity: items.quantity,
      unit: items.unit,
    });
    return acc;
  }, {});

  // Prepare the data to be sent to the PHP script
  const dataToSend = {
    reference: Object.keys(groupedData), // Get the references
    items: groupedData, // Grouped items
  };

  post("function/inventory-location-transfer.php", dataToSend).then((Data) => {
    console.log(Data);
  });
});
