const bankAccountTransferTable = document.getElementById(
  "bank-account-transfer-table"
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

renderBankAccountTransferTable();
checkTables();

async function checkTables() {
  const response = await fetch("exec/create.php");
  const result = await response.json();
  console.log(result); // Log the result to see if tables were created successfully
  return result.success; // Assuming the PHP script returns a success property
}

function renderBankAccountTransferTable() {
  let html = `
    <table>
            <tr>
                <td>From Account: <select name="" id="from-account-selector"></select></td>
                <td>Amount: <input type="text" name="" id="amount-input"></td>
            </tr>
            <tr>
                <td>Bank Balance: <input type="text" name="" id="bank-balance-input"></td>
                <td>Bank Charge: <input type="text" name="" id="bank-charge-input"></td>
            </tr>
            <tr>
                <td>To Account: <select name="" id="to-account-selector"></select></td>
                <td>Memo: <input type="text" name="" id="memo-input"></td>
            </tr>
            <tr>
                <td>Reference: <input type="text" name="" id="reference-input"></td>
            </tr>
            <tr>
                <td>Dimenson: <select name="" id="dimension-selector"></select></td>
            </tr>
        </table>
    `;
  bankAccountTransferTable.innerHTML = html;
}

const fromAccountSelector = document.getElementById("from-account-selector");
const amountInput = document.getElementById("amount-input");
const bankBalanceInput = document.getElementById("bank-balance-input");
const bankChargeInput = document.getElementById("bank-charge-input");
const toAccountSelector = document.getElementById("to-account-selector");
const memoInput = document.getElementById("memo-input");
const referenceInput = document.getElementById("reference-input");
const dimensionSelector = document.getElementById("dimension-selector");
const enterTransferButton = document.getElementById("enter-transfer-button");

enterTransferButton.addEventListener("click", () => {
  post("function/bank-account-transfer.php", {
    fromAccount: fromAccountSelector.value,
    amount: amountInput.value,
    bankBalance: bankBalanceInput.value,
    bankCharge: bankChargeInput.value,
    toAccount: toAccountSelector.value,
    memo: memoInput.value,
    reference: referenceInput.value,
    dimension: dimensionSelector.value,
  }).then((Data) => {
    console.log(Data);
  });
});
