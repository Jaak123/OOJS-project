const getAllFood = async () => {
  return await fetch("https://dev-api.mstars.mn/api/foods", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
//Food class that has properties: category, category_id, image, discount, price, name, stock
class Food {
  constructor(category, category_id, image, discount, price, name, stock) {
    this.category = category;
    this.category_id = category_id;
    this.image =
      "https://mtars-fooddelivery.s3.ap-southeast-1.amazonaws.com" + image;
    this.discount = discount;
    this.price = price;
    this.name = name;
    this.stock = stock;
  }
  addProduct() {
    this.stock += 1;
    return true;
  }
  removeProduct() {
    this.stock -= 1;
    return true;
  }
}
let foods = [];
//and methods: addProduct, removeProduct

//create an array foods

//call getAllFoods() then create Food objects and push every Food objects to foods array
getAllFood()
  .then((response) => response.json())
  .then((response) => {
    foodArr = response.data.map((e) => {
      return new Food(
        e.category,
        e.category_id,
        e.image,
        e.discount,
        e.price,
        e.name,
        e.stock
      );
    });
    generateHTML(foodArr);
  });

//Generate HMTL function
let foodsAll = document.querySelector(".foods");
function generateHTML(asdf) {
  // console.log(asdf);
  asdf.map((e) => {
    const card = document.createElement("card");
    card.innerHTML = `<div class="card">
     <img src=${e.image}
     alt=""
     class="mainImg"/>
     <div class="badge">${e.discount}%</div>
     <h2>${e.name}</h2>
     <div class="price">
     <p class="activePrice">${new Intl.NumberFormat().format(
       e.price - (e.price * e.discount) / 100
     )}₮${" "}</p>
     <strike class="strike-dark">${Intl.NumberFormat().format(
       e.price
     )}₮</p></strike>
     <p id="${e.name}id" max="10" min="0" >Stock: ${e.stock}</p>
     <div class="btns">
     <button class="btnPlus" id="${e.name}+">+</button>
     <button class="btnMinus" id="${e.name}-">-</button>
     </div>
     </div>
   </div>`;
    foodsAll.appendChild(card);

    document.getElementById(`${e.name}+`).addEventListener("click", () => {
      console.log("hi");
      e.addProduct();
      document.getElementById(`${e.name}id`).innerHTML = `Stock: ${e.stock}`;
    });
    document.getElementById(`${e.name}-`).addEventListener("click", () => {
      console.log("ho");
      e.removeProduct();
      document.getElementById(`${e.name}id`).innerHTML = `Stock: ${e.stock}`;
    });
  });
}
