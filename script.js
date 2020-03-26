"use strict"

let balance = document.querySelector(".balance");
let displayText = document.querySelector(".display-text");
let progressBar = document.querySelector(".progress-bar");
let coffeeCup = document.querySelector(".coffee-cup img");

let coffeeStatus = "waiting"; // "cooking", "ready"

function buyCoffee(name, cost, elem) {
  if (coffeeStatus != "waiting") {
    return;
  }
  let afterBuyValue = +balance.value - cost;
  if ((balance.value - cost) < 0 || Number.isNaN(afterBuyValue)) {
    balance.style.border = "2px solid red";
    balance.style.backgroundColor = "pink";
    changeDisplayText("Недостаточно средств");
    return;
  }
  balance.style.border = "none";
  balance.style.backgroundColor = "white";
  balance.value = (+balance.value - cost).toFixed(2);
  //changeDisplayText(`Ваш ${name} готовится!`);
  //alert("Ваш " + name + " готовится!");
  cookCoffee(name, elem);
}

function cookCoffee(name, elem) {
  coffeeStatus = "cooking";
  changeDisplayText("Ваш " + name + " готовится");
  
  let cupImg = elem.querySelector("img");
  let cupSrc = cupImg.getAttribute("src");
  coffeeCup.setAttribute("src", cupSrc); // ищет атрибут и меняет
  console.log(cupImg);
  /*if (coffeeStatus != "waiting") {
    return;
  }*/
  coffeeCup.style.opacity =  "0%";
  //coffeeCup.classlist.opacity = readyPercent + "%";
  
  //coffeeCup.classList.add(""); //добавить класс
  coffeeCup.classList.remove("d-none"); // убрать класс
  //coffeeCup.classList.toggle(""); // вкл/выкл класс
  
  //coffeeCup.classList.contains("d-none"); // содержит ли
  
  let readyPercent = 0;
  let cookingInterval = setInterval(()=> {
    readyPercent++
    progressBar.style.width = readyPercent + "%";
    coffeeCup.style.opacity = readyPercent + "%";
    if (readyPercent == 100) {
      coffeeStatus = "ready";
      changeDisplayText("Ваш " + name + " готов!");
      coffeeCup.style.cursor = "pointer";
      clearInterval(cookingInterval);
    }
  }, 100);
}

function changeDisplayText(text) {
 //displayText.innerText = "<span>"+text+"</span>";
  displayText.innerHTML = "<span>"+text+"</span>";
}
