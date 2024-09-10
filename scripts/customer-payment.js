const inputDiv = document.querySelector(".input-div");
const tableDiv = document.querySelector(".mid-third");

renderInputs();
renderTable();
customerSelectorOptions();
//INPUT DIV
const customerSelector = document.getElementById("customer-selector");
const branchSelector = document.getElementById("branch-selector");
const bankAccountSelector = document.getElementById("bank-account-selector");
const dateInput = document.getElementById("date-input");
const referanceInput = document.getElementById("referance-input");
const bankChargeInput = document.getElementById("bank-charge-input");
const dimensionsSelector = document.getElementById("dimensions-selector");
//TABLE DIV
const amountOfDiscount = document.getElementById("amount-of-discount");
const amount = document.getElementById("amount");
const memo = document.getElementById("memo");
const addPaymentButton = document.getElementById("add-payment-button");

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

addPaymentButton.addEventListener("click", () => {
    post('function/customer-payment.php', {
        customer: customerSelector.value,
        branch: branchSelector.value,
        bankAccount: bankAccountSelector.value,
        date: dateInput.value,
        referance: referanceInput.value,
        bankCharge: bankChargeInput.value,
        dimensions: dimensionsSelector.value,
        amountOfDiscount: amountOfDiscount.value,
        amount: amount.value,
        memo: memo.value
    }).then((Data)=>{
        console.log(Data)
    });
});

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
  const customerSelectorElement = document.getElementById("customer-selector");
  customerSelectorElement.innerHTML = innerOptions;
}

function renderInputs() {
  let html = `
    <div class="customer-info">
            <label for="from-customer">From Customer:
                <select name="customer-selector" id="customer-selector">
                    
                </select>
            </label><br>
            <label for="branch">Branch:
                <select name="branch" id="branch-selector">
                    <option value="branch-1">Branch 1</option>
                    <option value="branch-2">Branch 2</option>
                </select>
            </label><br>
            <label for="into-bank-acount">Into Bank Account:
                <select name="bank-account" id="bank-account-selector">
                    <option value="current-account">Current Account</option>
                    <option value="petty-cash-account">Petty Cash Account</option>
                </select>
            </label>
        </div>
        <div class="credit-and-discount">
            <label for="date-of-deposit">Date of Deposit:
                <input type="date" id="date-input">
            </label><br>
            <label for="referance">Reference:
                <input type="text" id="referance-input">
            </label>
        </div>
        <div class="customer-info">
            <label for="bank-charge">Bank Charge:
                <input type="text" name="bank-charge" id="bank-charge-input">
            </label><br>
            <label for="dimensions">Dimensions:
                <select name="dimensions" id="dimensions-selector">
                    <option value="dim-1">Dim 1</option>
                    <option value="dim-2">Dim 2</option>
                    <option value="dim-3">Dim 3</option>
                </select>
            </label>
        </div>
    `;
  inputDiv.innerHTML = html;
}

function renderTable() {
  let html = `
    <table>
            <tr>
                <td>Customer prompt payment discount:</td>
                <td>0.0%</td>
            </tr>
            <tr>
                <td>Amount of Discount:</td>
                <td><input type="text" name="" id="amount-of-discount">RAND</td>
            </tr>
            <tr>
                <td>Amount:</td>
                <td><input type="text" name="" id="amount">RAND</td>
            </tr>
            <tr>
                <td>Memo:</td>
                <td><input type="text" name="" id="memo"></td>
            </tr>
        </table>
    `;
  tableDiv.innerHTML = html;
}
