const inputDiv = document.getElementById("top-third");
const TableDiv = document.getElementById("mid-third");
const placeButton = document.getElementById("add-item-button");

renderInputs();
renderPurchaseOrderTable();

function renderInputs(){
    let html = `
    <div id="supplier-details-1">
            <label for="supplier">Supplier:
                <select name="supplier-selector" id="supplier-selector">
                    <option value="supplier-1">Supplier 1</option>
                </select>
            </label><br>
            <label for="order-date">Order Date:
                <input type="date" id="date-input">
            </label><br>
            <label for="current-credit">Current Credit:
                0.00
            </label><br>
            <label for="supplier-currency">Supplier Currency:
                RAND
            </label><br>
            <label for="exchange-rate">Exchange Rate:
                <input type="text" id="exchange-rate-input" placeholder="1.0000"> RAND = 19USD
            </label><br>
            <label for="reference">Reference:
                <input type="text" id="reference-input">
            </label>
        </div>
        <div id="supplier-reference">
            <label for="supplier-reference">Supplier Reference:
                <input type="text" id="supplier-reference-input">
            </label><br>
            <label for="dimensions">Dimensions:
                <select name="dimensions-selector" id="dimensions-selector">
                    <option value="default">default</option>
                </select>
            </label><br>
            <label for="receive-into">Receive Into:
                <select name="receive-into-selector" id="receive-into-selector">
                    <option value="default">Default</option>
                </select>
            </label>
        </div>
        <div id="deliver-to">
            <label for="deliver-to">Delvier To:
                <input type="text" id="deliver-to-input">
            </label>
        </div>
    `
    inputDiv.innerHTML = html;
}

function renderPurchaseOrderTable(){
    let html = `
    <table>
            <th>Item Code</th>
            <th>Item Description</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Required Delviery Date</th>
            <th>Price Before Tax</th>
            <th>Line Total</th>
            <tbody>
                <tr>
                    <td><input type="text" name="" id="item-code-input"></td>
                    <td><select name="" id="item-description-selector"></select></td>
                    <td><input type="text" name="" id="quantity-input"></td>
                    <td>each</td>
                    <td><input type="date" name="" id="required-delivery-date-input"></td>
                    <td><input type="text" name="" id="price-before-tax-input"></td>
                    <td></td>
                    <td><input type="button" value="Add Item"  id="add-item-button"></td>
                </tr>
                <tr>
                    <td colspan="6">Sub-total</td>
                    <td>0.00</td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="6">Amount Total</td>
                    <td>0.00</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    `
    tableDiv.innerHTML = html;
}

