import { productsEngland, productsFrance, productsGermany } from "./data.js";


const productFrance = JSON.parse(productsFrance);
const productGermany = JSON.parse(productsGermany);
const productEngland = JSON.parse(productsEngland);

const productList = document.querySelector('.products__list');

productFrance.forEach(({image, author, name, description, price}) => {
    const productEl = `
    <li class="products__item">
    <article>
      <a class="products__item-link" href="#">
        <img
          src="${image}"
          alt="${name}"
          height="422"
          class="products__item-img"
        />
      </a>
      <div class="products__item-description-wrp">
        <div class="products__item-description">
          <span class="products__item-description-author"
            >${author}</span
          >
          <h3 class="products__item-description-title">${name}</h3>
          <p class="products__item-description-txt">
          ${description}
          </p>
        </div>
        <div class="products__item-btn-wrp">
          <span
            class="products__item-description-price text-color-green"
            ><span>${price}</span> руб</span
          >
          <button class="products__item-btn text-color-green">
            В&nbsp;корзину
          </button>
        </div>
      </div>
    </article>
  </li>
    `
    productList.insertAdjacentHTML('beforeend',productEl);
});
