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
  
  let bill = this;
  let billCost = bill.getAttribute("cost");
  
  if (inAtm(bill)){
    balance.value = +balance.value + +billCost
    bill.remove();
  }
}

function inAtm(bill) {
  
  let billCoord = bill.getBoundingClientRect();
  let atm = document.querySelector(".atm");
  let atmCoord = atm.getBoundingClientRect();
  
  let billLeftTopCornerX = billCoord.x;
  let billLeftTopCornerY = billCoord.y;
  
  let billRightTopCornerX = billCoord.x + billCoord.width;
  let billRightTopCornerY = billCoord.y;
  
  let atmLeftTopCornerX = atmCoord.x;
  let atmLeftTopCornerY = atmCoord.y;
  
  let atmRightTopCornerX = atmCoord.x + atmCoord.width;
  let atmRightTopCornerY = atmCoord.y; 
  
  let atmLeftBottomCornerX = atmCoord.x;
  let atmLeftBottomCornerY = atmCoord.y + atmCoord.height/3;
  
  let atmRightBottomCornerX = atmCoord.x + atmCoord.width;
  let atmRightBottomCornerY = atmCoord.y + atmCoord.height/3;
  
  
  /*console.log(
              [
                [billLeftTopCornerX, billLeftTopCornerY] , [billRightTopCornerX, billRightTopCornerY]
              ],
              [
                [atmLeftTopCornerX, atmLeftTopCornerY] , [atmRightTopCornerX, atmRightTopCornerY],
                [atmLeftBottomCornerX, atmLeftBottomCornerY] , [atmRightBottomCornerX, atmRightBottomCornerY],
              ]
              )*/
  if (
      billLeftTopCornerX >= atmLeftTopCornerX
      && billLeftTopCornerY >= atmLeftTopCornerY
      && billRightTopCornerX <=atmRightTopCornerX
      && billRightTopCornerY >= atmRightTopCornerY
      
      && billLeftTopCornerX >= atmLeftBottomCornerX
      && billLeftTopCornerY <= atmLeftBottomCornerY
    ) {
      return true;
    } else {
      return false;
    }
}

// ---------------------------Сдача---------------------

let changeBtn = document.querySelector(".change");
changeBtn.onclick = takeChange;

function takeChange() {
  tossCoin("10");
}

function tossCoin(cost) {
  let changeContainer = document.querySelector(".change-box");
  let changeContainerCoords = changeContainer.getBoundingClientRect();
  let coinSrc = "";
  
  switch (cost) {
    case "10":
    coinSrc = "img/10rub.png";
    break;
    case "5":
    coinSrc = "img/5rub.png";
    break;
    case "2":
    coinSrc = "img/2rub.png";
    break;
    case "1":
    coinSrc = "img/1rub.png";
    break;
  }
  
  /*changeContainer.innerHTML += `
  <img src="${coinSrc}" style="height: 50px">
  `*/ // старый способ
  
  // новый метод
  let coin = document.createElement("img");
  
  coin.setAttribute("src", coinSrc);
  coin.style.height = "50px";
  coin.style.cutsor = "pointer";
  coin.style.display = "inline-block";
  coin.style.position = "absolute";
  
  changeContainer.append(coin); // прикрепить после /*changeContainer.prepend(coin); //Прикрепить до*/
  //append это внутренее наполнение контейнера; prepend - в начало
  //changeContainer.after(coin); //после контейнера
  //changeContainer.before(coin); // перед контейнера
  //changeContainer.replace(coin); // замена контейнера
  coin.style.top = Math.round(Math.random() * (changeContainerCoords.height -53)) + "px";
  coin.style.left = Math.round(Math.random() * (changeContainerCoords.width - 53)) + "px";
  
  coin.onclick = () => coin.remove();
}





