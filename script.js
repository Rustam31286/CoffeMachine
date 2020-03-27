"use strict"

let balance = document.querySelector(".balance");
let displayText = document.querySelector(".display-text");
let progressBar = document.querySelector(".progress-bar");
let coffeeCup = document.querySelector(".coffee-cup img");

let coffeeStatus = "waiting"; // "cooking", "ready"

/*coffeeCup.onclick =  function() {
  takeCoffee(); // можно передавать , но с this
}*/
coffeeCup.onclick = takeCoffee; // не можем послать парамметры функции

//coffeeCup.addEventListener("click", takeCoffee, par1, par2, par3); // добавтьь функцию с памаметрами
/*coffeeCup.addEventListener("click", () => {
  takeCoffee();
}*/
//coffeeCup.addEventListener("click", buyCoffee, "Американо", 21);

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

function takeCoffee() {
  if (coffeeStatus != "ready") {
    return;
  }
  coffeeStatus = "waiting";
  coffeeCup.classList.add("d-none");
  coffeeCup.style.cursor = "auto";
  progressBar.style.width = "0%";
  changeDisplayText("Выберите кофе");
}

function changeDisplayText(text) {
 //displayText.innerText = "<span>"+text+"</span>";
  displayText.innerHTML = "<span>"+text+"</span>";
}

//--------------------------------Drag'n'Drop--------
let bills = document.querySelectorAll(".wallet img");
for(let i = 0; i < bills.length; i++) {
  bills[i].onmousedown = takeMoney;
}

function takeMoney(event) {  // возможно event как e
  event.preventDefault(); // отключает присвоенные браузером Drug и drop
  
  let bill = this;
  let billCost = bill.getAttribute("cost");
  
  bill.style.position = "absolute";
  bill.style.transform = "rotate(90deg)";
  
  let billCoords = bill.getBoundingClientRect()
  let billWidth = billCoords.width;
  let billHeight = billCoords.height;
  
  bill.style.top = event.clientY - billWidth/2 + "px";
  bill.style.left = event.clientX - billHeight/2 + "px";
  
  window.onmousemove = (event) => {
    bill.style.top = event.clientY - billWidth/2 + "px";
    bill.style.left = event.clientX - billHeight/2 + "px";
  }
  
  bill.onmouseup = dropMoney;
}

function dropMoney() {
  window.onmousemove = null;
}









