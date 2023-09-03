const mediaMobile400 = window.matchMedia("(max-width: 400px)");
const products = document.querySelector(".products");
const productsTitle = document.querySelector(".products__header-title");
const productsList = document.querySelector(".products__list");

if (mediaMobile400.matches) {
  productsTitle.classList.add("center");
  productsList.classList.add("center");
  products.classList.remove("center");
}

const productsHeaderBtn = document.querySelectorAll('.products__header-btn');

productsHeaderBtn.forEach(function(item){
  item.addEventListener('click', open);
});

function open(evt) {
  const tabTarget = evt.currentTarget;


  
  productsHeaderBtn.forEach(function(item){
    item.classList.remove('header-btn_active');
  })
  tabTarget.classList.add('header-btn_active');

}