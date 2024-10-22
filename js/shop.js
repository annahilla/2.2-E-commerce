let products = [];
fetch('./products.json')
    .then(response => response.json())
    .then(data => {
        products = data.products;
    })
    .catch(error => console.error('Error loading the JSON file:', error));

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

const cartList = document.getElementById("cart_list");
const totalCart = document.getElementById("total_price");
const countProduct = document.getElementById("count_product");

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    const product = products.find(product => product.id === id);

    // 2. Add found product to the cart array
    if (cart.includes(product)) {
        product.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    };

    let amountProductsInCart = 0;
    cart.forEach(item => {
        amountProductsInCart += item.quantity
    });

    countProduct.innerHTML = amountProductsInCart;
}

// Exercise 2
function cleanCart() {
    cart = [];
    cartList.innerHTML = '';
    totalCart.innerHTML = calculateTotal();
    countProduct.innerHTML = cart.length;
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    })
    return totalPrice;
}

// Exercise 4
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    cart.forEach(item => {
        if (item.name === "Cooking oil" && item.quantity >= 3) {
            item.subtotalWithDiscount = item.price * 0.8;
        } else if (item.name === "Instant cupcake mixture" && item.quantity >= 10) {
            item.subtotalWithDiscount = item.price * 0.7;
        } else {
            delete item.subtotalWithDiscount;
        }
    })
}

// Exercise 5
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    cartList.innerHTML = '';

    applyPromotionsCart();

    cart.forEach(item => {
        const newTableRow = document.createElement("tr");
        cartList.appendChild(newTableRow);

        const newTableHeader = document.createElement("th");
        newTableHeader.setAttribute("scope", "row");
        newTableHeader.appendChild(document.createTextNode(`${item.name} `));
        newTableRow.appendChild(newTableHeader);

        const newTableDataForPrice = document.createElement("td");
        const newTableDataForQuantity = document.createElement("td");
        const newTableDataForTotal = document.createElement("td");
        const newTableDataForDelete = document.createElement("td");

        const deleteButton = document.createElement("button");
        newTableDataForDelete.appendChild(deleteButton);
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-danger");

        deleteButton.addEventListener('click', () => {
            removeFromCart(item.id)
        });

        newTableDataForPrice.textContent = `$${item.price} `;
        newTableDataForQuantity.textContent = item.quantity;

        if (item.subtotalWithDiscount) {
            newTableDataForTotal.textContent = `$${(item.subtotalWithDiscount * item.quantity).toFixed(2)} `;
        } else {
            newTableDataForTotal.textContent = `$${item.price * item.quantity} `;
        }

        newTableRow.appendChild(newTableDataForPrice);
        newTableRow.appendChild(newTableDataForQuantity);
        newTableRow.appendChild(newTableDataForTotal);
        newTableRow.appendChild(newTableDataForDelete);
    })
    totalCart.innerHTML = cart.length === 0 ? 0 : calculateTotal();
    countProduct.innerHTML = cart.length;
}

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
    const productInCart = products.find(product => product.id === id);

    const index = cart.indexOf(productInCart);
    if (productInCart.quantity > 1) {
        productInCart.quantity--;
    } else {
        cart.splice(index, 1);
    }

    applyPromotionsCart();
    printCart();
}

function open_modal() {
    printCart();
}