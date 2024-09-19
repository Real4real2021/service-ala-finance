const firstTabel = document.getElementById("first-table");
const secondTabel = document.getElementById("second-table");

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

renderFirstTable();
renderSecondTable();
checkTables();

async function checkTables() {
  const response = await fetch("exec/create.php");
  const result = await response.json();
  console.log(result); // Log the result to see if tables were created successfully
  return result.success; // Assuming the PHP script returns a success property
}

function renderFirstTable() {
  let html = `
    <table>
        <th>Location Code</th>
        <th>Location Name</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Seconday phone</th>
        <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
    `;
  firstTabel.innerHTML = html;
}

function renderSecondTable() {
  let html = `
    <table>
        <tr>
            <td>Location Code:</td>
            <td><input type="text" name="" id="location-code-input"></td>
        </tr>
        <tr>
            <td>Location Name:</td>
            <td><input type="text" name="" id="location-name-input"></td>
        </tr>
        <tr>
            <td>Contact for deliveries:</td>
            <td><input type="text" name="" id="contact-for-deliveries-input"></td>
        </tr>
        <tr>
            <td>Address:</td>
            <td><input type="text" name="" id="address-input"></td>
        </tr>
        <tr>
            <td>Telephone:</td>
            <td><input type="text" name="" id="telephone-input"></td>
        </tr>
        <tr>
            <td>Secondary Telephone:</td>
            <td><input type="text" name="" id="secondary-telephone-input"></td>
        </tr>
        <tr></tr>
            <td>Email:</td>
            <td><input type="text" name="" id="email-input"></td>
    </table>
    `;
  secondTabel.innerHTML = html;
}

const locationCodeInput=  document.getElementById("location-code-input")
const locationNameInput= document.getElementById("location-name-input")
const contactForDeliveriesInput= document.getElementById("contact-for-deliveries-input")
const addressInput=  document.getElementById("address-input")
const telephoneInput=  document.getElementById("telephone-input")
const secondaryTelephoneInput =  document.getElementById("secondary-telephone-input")
const eamilInput= document.getElementById("email-input")

const addNewButton = document.getElementById("add-new-button");

addNewButton.addEventListener("click", () => {
    post("function/inventory-location.php", {
        locationCode: locationCodeInput.value,
        locationName: locationNameInput.value,
        contactForDeliveris: contactForDeliveriesInput.value,
        address: addressInput.value,
        telephone: telephoneInput.value,
        secondaryTelephone: secondaryTelephoneInput.value,
        email: eamilInput.value
    }).then((Data) => {
        console.log(Data);
    });
});