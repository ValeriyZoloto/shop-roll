// ЧАСТЬ 2. Добавляем товар в корзину и проверяем есть ли он там.
//Если есть то увеличиваем его количество.

//Div внутри корзины, в который мы добавляем товары
const cartWrapper = document.querySelector('.cart-wrapper');

//Отслеживаем клик на всей странице
window.addEventListener('click', function (event) {
    //Показывает в консоли клик
    // console.log('click');
    //Показывает в консоли на какой элемент был клик
    // console.log(event.target);
    //Проверяем имеет ли event атрибут data-cart (клик по кнопке "Добавить в корзину")
    if (event.target.hasAttribute('data-cart')) {
     
      //Находим карточку с товаром внутри которой был клик (методом closest поднимается до родителя имеещего класс card)  
    const card = event.target.closest('.card');

     

    // Собираем данные с этого товара и записываем их в единый  обьект с данными карточки товара
     const productInfo = {
         id: card.dataset.id,
         imgSrc: card.querySelector ('.product-img').getAttribute('src') ,
         title: card.querySelector ('.item-title').innerText,
         itemsInBox: card.querySelector ('[data-items-in-box]').innerText ,
         weigth: card.querySelector ('.price__weight').innerText,
         price: card.querySelector ('.price__currency').innerText,
         counter: card.querySelector ('[data-counter]').innerText

     };

     //Проверяем есть ли такой товар в корзине 

     const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`); 
     //Если товар есть в корзине
     if (itemInCart) {
         const counterElement = itemInCart.querySelector('[data-counter]');
         counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
     } 
     // Если товара нет в корзине
     else {
       //Собранные данные подставим в шаблон для товара в корзине.
      const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">         
      <div class="cart-item__top">
       <div class="cart-item__img">
  <img src="${productInfo.imgSrc}" alt="">
</div>
<div class="cart-item__desc">
  <div class="cart-item__title">${productInfo.title}</div>
  <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weigth}</div>

  <!-- cart-item__details -->
  <div class="cart-item__details">

      <div class="items items--small counter-wrapper">
          <div class="items__control" data-action="minus">-</div>
          <div class="items__current" data-counter="">${productInfo.counter}</div>
          <div class="items__control" data-action="plus">+</div>
      </div>

      <div class="price">
          <div class="price__currency">${productInfo.price}</div>
      </div>

  </div>
  <!-- // cart-item__details -->

</div>
</div>
</div>`;

//Отобразим товар в корзине.
cartWrapper.insertAdjacentHTML('beforeend',cartItemHTML);

     }

    //Сбрасываем счетчик количества товара который только-что добавили в корзину
    card.querySelector ('[data-counter]').innerText ='1';
      
    toggleCartStatus ();
}
     //Удаление товаров из корзины
     if (event.target.getAttribute('data-action') == 'minus' && event.target.closest('.cart-wrapper')) {
        console.log('MINUS IN CARD');
        const counterNum = event.target.closest('.counter-wrapper').querySelector('[data-counter]').innerText;
     }
    
})

 //Функция показа/скрытия Корзина пуста, перерасчета суммы заказа
 function toggleCartStatus () {
    const cartEmpty = document.querySelector("[data-cart-empty]");
    const cartTotal = document.querySelector(".cart-total");
    const orderForm = document.querySelector("#order-form");
    const deliveryCost = document.querySelector(".delivery-cost");

     //Показываем или скрываем определенные эл-ты в корзине
     //Проверяем есть ли в корзине товары (наличие тегов с классoм .cart-item)

     //Если в корзине есть товары
     if (cartWrapper.querySelectorAll(".cart-item").length > 0) {
        cartEmpty.classList.add("none");
        cartTotal.classList.remove("none");
        orderForm.classList.remove("none");
     } 
     // Если корзина пуста
     else{
        cartEmpty.classList.remove("none");
        cartTotal.classList.add("none");
        orderForm.classList.add("none");
       
     }
     let totalPrice = 0;
  cartWrapper.querySelectorAll(".cart-item").forEach(function (item) {
    const counter = item.querySelector("[data-counter]").innerText;
    const priceOneItem = item.querySelector(".price__currency").innerText;
    const price = parseInt(counter) * parseInt(priceOneItem);
    totalPrice = totalPrice + price; //Лучше будет данный формат - totalPrice += price;
  });

  cartTotal.querySelector(".total-price").innerText = totalPrice;
  //Домашнее задание 
  if (cartTotal.querySelector(".total-price").innerText < 1000) {
    deliveryCost.classList.add("paid"); //Класс добавлен для изменения цвета текста при оплате за доставку
    cartTotal.querySelector(".delivery-cost").innerText = "300 руб.";
  } else {
    deliveryCost.classList.remove("paid");
    cartTotal.querySelector(".delivery-cost").innerText = "бесплатно";
  }
 }
 