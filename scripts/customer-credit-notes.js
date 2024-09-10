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
    <div class="customer-info">
            <label for="customer">Customer:
                <select name="customer-selector" id="customer-selector">
                    
                </select>
            </label><br>
            <label for="branch">Branch:
                <select name="branch" id="branch">
                    <option value="branch-1">Branch 1</option>
                    <option value="branch-2">Branch 2</option>
                    <option value="branch-3">Branch 3</option>
                </select>
            </label><br>
            <label for="reference">Reference:
                <input type="text">
            </label>
        </div>
        <div class="customer-info">
            <label for="sales-type">Sales Type:
                <select name="sales-type" id="sales-type">
                    <option value="retail">Retail</option>
                    <option value="wholesale">Wholesale</option>
                </select>
            </label><br>
            <label for="shipping-company">Shipping Company:
                <select name="shipping-company" id="shipping-company">
                    <option value="default">Default</option>
                </select>
            </label><br>
            <label for="customer-discount">Customer Discount:
                0%
            </label>
        </div>
        <div class="customer-info">
            <label for="date">Date:
                <input type="date" name="" id="">
            </label><br>
            <label for="dimensions">Dimensions:
                <select name="" id=""></select>
            </label>
        </div>
    `
    inputDiv.innerHTML = html;
}

