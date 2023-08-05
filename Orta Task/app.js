let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let checkout = document.querySelector('.checkout');

function displayTotalPrice(price) {
    total.innerText = `Total Price: ${price.toLocaleString()} TL`;
  }
openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})
checkout.addEventListener('click', ()=>{
    window.location.reload();
})

let products = [];
async function fetchProductsData() {
    try {
      const response = await fetch('product.json');
      if (!response.ok) {
        throw new Error('Failed to fetch products data');
      }
      const productsData = await response.json();
      products = Object.keys(productsData.products[0]).map((key, index) => {
        const product = productsData.products[0][key];
        return {
          id: index + 1,
          name: key,
          price: parseInt(product.price),
          img: product.img,
        };
      });
      initApp();
    } catch (error) {
      console.error(error);
    }
  }

  function initApp() {
    products.forEach((value, key) => {
      let newDiv = document.createElement('div');
      newDiv.classList.add('item');
      newDiv.innerHTML = `
        <img src="${value.img}">
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}</div>
        <button onclick="addToCard(${key})">Add To Card</button>`;
      list.appendChild(newDiv);
    });
  }
  
    products.forEach((value, key) => {
      let newDiv = document.createElement('div');
      newDiv.classList.add('item');
      newDiv.innerHTML = `
        <img src="${value.img}">
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}</div>
        <button onclick="addToCard(${key})">Add To Card</button>`;
  
      list.appendChild(newDiv);
    });

let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.img}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()} TL</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
  
    listCards.forEach((value, key) => {
      totalPrice = totalPrice + value.price;
      count = count + value.quantity;
      if (value != null) {
        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
          <div><img src="${value.img}"/></div>
          <div>${value.name}</div>
          <div>${value.price.toLocaleString()} TL</div>
          <div>
            <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
            <div class="count">${value.quantity}</div>
            <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
          </div>`;
        listCard.appendChild(newDiv);
      }
    });
  
    displayTotalPrice(totalPrice);
    quantity.innerText = count;
  }
  
  
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
function applyDiscount() {
    const discountPercentage = 0.2; // 20% discount
    let totalDiscountedPrice = 0;
  
    listCards.forEach((value, key) => {
      if (value != null) {
        const discountedPrice = value.price * (1 - discountPercentage);
        totalDiscountedPrice += discountedPrice * value.quantity;
        listCards[key].price = discountedPrice;
      }
    });
  
    reloadCard();
  }
  fetchProductsData();
