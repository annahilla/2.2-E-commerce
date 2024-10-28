let products = [];
fetch('./products.json')
    .then(response => response.json())
    .then(data => {
        products = data.products;
    })
    .catch(error => console.error('Error loading the JSON file:', error));

var cart = [];
var total = 0;

const cartList = document.getElementById("cart_list");
const totalCart = document.getElementById("total_price");
const countProduct = document.getElementById("count_product");

// Exercise 1
function buy(id) {
    const product = products.find(product => product.id === id);

    if (cart.includes(product)) {
        product.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    };

    let amountProductsInCart = 0;
    cart.forEach(item => {
        amountProductsInCart += item.quantity;
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
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    })
    return totalPrice;
}

// Exercise 4
function applyPromotionsCart() {
    cart.forEach(item => {
        if (item.offer && item.quantity >= item.offer.number) {
            item.subtotalWithDiscount = item.price * (1 - item.offer.percent / 100);
        } else {
            delete item.subtotalWithDiscount;
        }
    })
}

// Exercise 5
function printCart() {
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
            removeFromCart(item.id);
        });

        newTableDataForPrice.textContent = `$${(item.price).toFixed(2)} `;
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

    let amountProductsInCart = 0;
    cart.forEach(item => {
        amountProductsInCart += item.quantity
    });

    countProduct.innerHTML = amountProductsInCart;
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