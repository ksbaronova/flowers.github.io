// Корзина (пустой массив)
let cart = [];

// Функция добавления товара
function addToCart(id, name, price) {
    // Проверяем, есть ли товар уже в корзине
    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity = cart[i].quantity + 1;
            found = true;
            break;
        }
    }
    // Если нет — добавляем новый
    if (found === false) {
        cart.push({ id: id, name: name, price: price, quantity: 1 });
    }
    updateCart();
}

// Функция удаления товара
function removeFromCart(id) {
    let newCart = [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id !== id) {
            newCart.push(cart[i]);
        }
    }
    cart = newCart;
    updateCart();
}

// Функция обновления корзины на экране
function updateCart() {
    let cartList = document.getElementById("cartItems");
    let total = 0;
    let count = 0;
    
    cartList.innerHTML = "";
    
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let itemTotal = item.price * item.quantity;
        total = total + itemTotal;
        count = count + item.quantity;
        
        cartList.innerHTML = cartList.innerHTML + '<li>' + item.name + ' x ' + item.quantity + ' = ' + itemTotal + ' ₽ <button onclick="removeFromCart(' + item.id + ')">Удалить</button></li>';
    }
    
    document.getElementById("cartCount").innerText = count;
    document.getElementById("cartTotal").innerText = total;
    document.getElementById("totalPrice").innerText = total;
}

// Находим все кнопки "В корзину" и добавляем обработчики
let buttons = document.querySelectorAll('.add-to-cart');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
        let card = this.parentElement;
        let id = parseInt(card.getAttribute('data-id'));
        let name = card.getAttribute('data-name');
        let price = parseInt(card.getAttribute('data-price'));
        addToCart(id, name, price);
    };
}

// Кнопка "Оформить заказ"
document.getElementById("orderBtn").onclick = function() {
    document.getElementById("orderForm").style.display = "block";
};

// Отправка формы заказа
document.getElementById("orderFormElem").onsubmit = function(event) {
    event.preventDefault();
    
    let name = document.getElementById("userName").value;
    let phone = document.getElementById("userPhone").value;
    let address = document.getElementById("userAddress").value;
    
    if (name === "" || phone === "" || address === "") {
        alert("Заполните все поля!");
        return;
    }
    
    document.getElementById("orderMessage").innerHTML = "✅ Спасибо, " + name + "! Заказ принят.";
    
    cart = [];
    updateCart();
    document.getElementById("orderForm").style.display = "none";
    document.getElementById("orderFormElem").reset();
    
    setTimeout(function() {
        document.getElementById("orderMessage").innerHTML = "";
    }, 5000);
};

// Запуск обновления корзины
updateCart();