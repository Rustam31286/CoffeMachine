"use strict"

let balance = document.querySelector(".balance");

function buyCoffee(name, cost) {
  let afterBuyValue = +balance.value - cost;
  if ((balance.value - cost) < 0 || Number.isNaN(afterBuyValue)) {
    alert("Недостаточно средств");
    return;
  }
  balance.value = (+balance.value - cost).toFixed(2);
  alert("Ваш " + name + " готовится!");
}
