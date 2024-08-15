// Sample product data (replace with your actual data)
const products = [
  { id: 1, name: "Product A", price: 10 },
  { id: 2, name: "Product B", price: 15 },
  // ... more products
];

const productList = document.getElementById("product-list");
const shoppingCart = document.getElementById("shopping-cart");
const checkout = document.getElementById("checkout");

let shoppingCartItems = [];
// Function to display products
function displayProducts() {
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.textContent = `${product.name} - R${product.price}`;
    // Add event listener to add product to cart
    productElement.addEventListener("click", () => addToCart(product));
    productList.appendChild(productElement);
  });
}

// Function to add product to shopping cart
function addToCart(product) {
  // Implement logic to add product to shopping cart array
  // Update shopping cart display
}

// Function to calculate total and display in checkout section
function calculateTotal() {
  // Implement logic to calculate total based on shopping cart items
  // Update checkout section with total
}

// Function to process payment (placeholder for now)
function processPayment() {
    const paymentGateway = new PaymentGateway('your_api_key');
    const cardNumber = document.getElementById('card-number').value;
    const expirationDate = document.getElementById('expiration-date').value;
    const cvv = document.getElementById('cvv').value;
  
    paymentGateway.charge({
      amount: total,
      cardNumber: cardNumber,
      expirationDate: expirationDate,
      cvv: cvv
    })
    .then(response => {
      if (response.success) {
        // Payment successful
        console.log('Payment successful');
        // Redirect to thank you page or display success message
      } else {
        // Payment failed
        console.log('Payment failed:', response.error);
        // Display error message to user
      }
    })
    .catch(error => {
      console.error('Error processing payment:', error);
      // Handle unexpected errors
    });
  }

function updateShoppingCart() {
  shoppingCart.innerHTML = ""; // Clear the shopping cart

  shoppingCartItems.forEach((item) => {
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.value = item.quantity;
    quantityInput.min = 1;
    quantityInput.addEventListener("change", () => {
      item.quantity = parseInt(quantityInput.value);
      updateShoppingCart();
    });

    const cartItem = document.createElement("div");
    cartItem.textContent = `${item.name} - ${item.quantity} x R${
      item.price
    } = R${item.quantity * item.price}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeItem(item.id));

    cartItem.appendChild(removeButton);
    shoppingCart.appendChild(cartItem);
    cartItem.appendChild(quantityInput);
  });

  // Calculate total
  const total = shoppingCartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  checkout.textContent = `Total: R${total}`;
}

function calculateTotal() {
    const subtotal = shoppingCartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  
    // Apply discount if a valid code is entered
    let discount = 0;
    const discountCodeInput = document.getElementById('discount-code');
    const discountCode = discountCodeInput.value.toUpperCase();
    if (discountCode === 'DISCOUNT10') {
      discount = subtotal * 0.1;
    }
  
    // Calculate tax
    const taxRate = 0.07; // Example tax rate
    const tax = (subtotal - discount) * taxRate;
  
    const total = subtotal - discount + tax;
  
    checkout.textContent = `Subtotal: R${subtotal} - Discount: R${discount} + Tax: R${tax} = Total: R${total}`;
  }
  

function addToCart(product) {
  // Check if product is already in the cart
  const existingItem = shoppingCartItems.find((item) => item.id === product.id);

  if (existingItem) {
    // If product exists, increment quantity
    existingItem.quantity++;
  } else {
    // If product doesn't exist, add it to the cart with quantity 1
    shoppingCartItems.push({ ...product, quantity: 1 });
  }

  // Update shopping cart display (we'll implement this in the next step)
  updateShoppingCart();
}


  

// Initial call to display products
displayProducts();
