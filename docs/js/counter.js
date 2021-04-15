window.addEventListener('click',function (event) {
  if (event.target.hasAttribute('data-action')) {
      //От кнопки по которой кликнули находим родительский элемент обертку текущего счетчика
    const counterWrapper = event.target.closest('.counter-wrapper');
     //От обертки  находим div со значением  счетчика
    const counter = counterWrapper.querySelector('[data-counter]');

    if (event.target.dataset.action === 'plus'){
        
         //Изменяем текст показания счетчика увеличивая его на единицу
         counter.innerText = ++counter.innerText;

         if (event.target.closest(".cart-wrapper")) {
            toggleCartStatus();
          }

    } else if (event.target.dataset.action === 'minus'){
        if (event.target.closest(".cart-wrapper")) {
        //Уменьшаем счетчик только до единицы
        if(parseInt(counter.innerText)>1) {
        //Изменяем текст показания счетчика уменьшая его на единицу
        counter.innerText = --counter.innerText;
    } else {
        event.target.closest(".cart-item").remove();
      }
      toggleCartStatus();
    } else {
      if (parseInt(counter.innerText) > 1) {
        counter.innerText = --counter.innerText;
      }
    }
  }
}
});



    



  






//     //Находим кнопки плюс и минус
//     const btnPlus = document.querySelector('[data-action="plus"]');
//     const btnMinus = document.querySelector('[data-action="minus"]');

//      //Слушаем клик по кнопке +
//     btnPlus.addEventListener('click',function(event){
//         //От кнопки плюс находим родительский элемент обертку текущего счетчика
//      const counterWrapper = event.target.closest('.counter-wrapper');
//      //От обертки  находим div со значением  счетчика
//      const counter = counterWrapper.querySelector('[data-counter]');
//      //Изменяем текст показания счетчика увеличивая его на единицу
//      console.log(counter);

//      counter.innerText = ++counter.innerText;
//     });

// btnMinus.addEventListener('click',function(event){
// //От кнопки минус находим родительский элемент обертку текущего счетчика
// const counterWrapper = event.target.closest('.counter-wrapper');
// //От обертки  находим div со значением  счетчика
// const counter = counterWrapper.querySelector('[data-counter]');
// //Уменьшаем счетчик только до единицы
// if(parseInt(counter.innerText)>1){
// //Изменяем текст показания счетчика уменьшая его на единицу
// counter.innerText = --counter.innerText;
// }
// }); 

