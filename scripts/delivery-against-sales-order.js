const inputDiv = document.querySelector('.top-third');
const tableDiv = document.querySelector('.mid-third');

renderInputDiv();
renderTableDiv();

function renderInputDiv(){
    let html = `
    <h1>Search Outstanding Sales Order</h1>
       <label for="#">#:
        <input type="text" name="#" id="#">
       </label> 
       <label for="Ref">Ref:
        <input type="text" name="ref" id="ref">
       </label>
       <label for="location">Location:
        <select name="location" id="location">
            <option value="All Locations">All Locations</option>
            <option value="Default">Default</option>
        </select>
       </label>
       <label for="item">Item:
        <input type="text" name="item" id="item">
       </label>
       <select name="Inventory-item" id="Inventory-item">
        <option value="All Items">All Items</option>
        <option value="Item 1">Item 1</option>
        <option value="Item 2">Item 2</option>
       </select>
       <input type="button" value="Search">
       <label for="select-a-customer">Select a Customer:
        <select name="customer" id="customer">
            <option value="KK">KK</option>
            <option value="Kojo">Kojo</option>
        </select>
       </label>
    `
    inputDiv.innerHTML = html;
}

function renderTableDiv(){
    let html = `
    <table>
         <th>Order #</th>
         <th>Ref</th>
         <th>Customer</th>
         <th>Branch</th>
         <th>Cust Order Ref</th>
         <th>Order Date</th>
         <th>Required By</th>
         <th>Delivery To</th>
         <th>Order Total</th>
         <th>Currency</th>
         <tbody>
             <tr>
                 <td colspan="10">
                     No Records
                 </td>
             </tr>
         </tbody>
        </table>
    `
    tableDiv.innerHTML = html;
}