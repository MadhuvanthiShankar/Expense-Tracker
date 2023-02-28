// console.log("howdy!");
let bal = 0;
let inc = 0;
let exp = 0;
let transactionHistory = [];

/**
 *
 * @param {any[]} newArr
 */

function deleteListElement(index) {
  let storeNewArr = [];
  for (let i = 0; i < transactionHistory.length; i++) {
    if (i != index) {
      storeNewArr.push(transactionHistory[i]);
    }
  }
  transactionHistory = storeNewArr;
  updateHtmlHist(transactionHistory);
}

function updateHtmlHist(newArr) {
  let histContainer = document.querySelector(".history ul");
  histContainer.innerHTML = "";
  //   //method 1 - with a string
  //   let allList = "";
  //   newArr.forEach((a, b, c) => {
  //     allList += `<li class="${a.typeofamount == "xxxincxxx" ? "good" : "bad"}">
  //     <span>${a.description}</span>
  //     <span>${a.amount}</span>
  //     <button type="button" onClick="crossButton(event)">x</button>
  //     </li>`;
  //   });
  //   histContainer.innerHTML = allList;

  //method 2
  newArr.forEach((obj, ind) => {
    let newListElem = document.createElement("li");
    newListElem.setAttribute(
      "class",
      obj.typeofamount == "inc" ? "good" : "bad"
    );
    let descSpan = document.createElement("span");
    descSpan.textContent = obj.description;
    let amtSpan = document.createElement("span");
    amtSpan.textContent = obj.amount;
    var delButton = document.createElement("button");
    delButton.textContent = "x";
    delButton.addEventListener("click", () => {
      deleteListElement(ind);
    });
    newListElem.appendChild(descSpan);
    newListElem.appendChild(amtSpan);
    newListElem.appendChild(delButton);
    histContainer.appendChild(newListElem);
  });
}
function onSub(event) {
  event.preventDefault();
  console.log("working");
  var amt = document.querySelector("#amt-id").value;
  console.log("amt is " + amt);
  // var amt = document.querySelector("#amount").value;
  amt = Number(amt);
  // var eg = "desc";
  // document.querySelector("#bal").innerHTML = "Rs " + amt;
  var desc = document.querySelector("#description-id").value;
  console.log(desc);
  var radio = document.querySelector(".radio-op:checked").value;
  console.log(radio);
  if (radio == "xxxincxxx") {
    inc += amt;
    document.querySelector(".inc-num").innerHTML = "₹" + inc;
    bal += amt;
    document.querySelector("#bal").innerHTML = "₹" + bal;
  } else {
    exp += amt;
    document.querySelector(".exp-num").innerHTML = "₹" + exp;
    bal -= amt;
    document.querySelector("#bal").innerHTML = "₹" + bal;
  }
  const hist = {
    description: desc,
    amount: amt,
    typeofamount: radio == "xxxincxxx" ? "inc" : "exp",
  };
  transactionHistory.push(hist);
  console.log("this is hist", hist);
  console.log("this is transaction history", transactionHistory);
  updateHtmlHist(transactionHistory);
}
