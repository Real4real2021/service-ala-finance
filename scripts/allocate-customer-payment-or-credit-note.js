const inputDiv = document.querySelector('.input-div');

renderInputs();

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

function renderInputs(){
    let html = `
    <label for="select-customer">Select a Customer:
            <select name="customer-selector" id="customer-selector">
                <option value="kk">KK</option>
                <option value="Kojo">Kojo</option>
                <option value="Jr">Jr</option>
            </select>
        </label><br>
        <label for="show-settles-items">Show Settled Items:
            <input type="radio" name="" id="">
        </label>
    `
    inputDiv.innerHTML = html;
}