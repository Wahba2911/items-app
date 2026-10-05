const showProductsButton = document.getElementById("showProductsBtn");
const productsContainer = document.getElementById("productsContainer");
const productsUrl = "https://dummyjson.com/products";

function renderProducts(products) {
  let productsHTML = "";

  products.forEach((product) => {
    productsHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card product-card shadow-sm">
          <img src="${product.thumbnail}" class="card-img-top product-image" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="text-muted mb-2">${product.category}</p>
            <p class="card-text product-description">${product.description}</p>
            <h5 class="product-price">$${product.price}</h5>
            <button class="btn btn-primary w-100 mt-2" type="button">View Product</button>
          </div>
        </div>
      </div>
    `;
  });

  productsContainer.innerHTML = productsHTML;
}

function showErrorMessage() {
  productsContainer.innerHTML = `
    <div class="col-12">
      <div class="alert alert-danger text-center">
        Something went wrong!
      </div>
    </div>
  `;
}

async function loadProducts() {
  productsContainer.innerHTML = `
    <div class="col-12 text-center">
      <h3>Loading...</h3>
    </div>
  `;

  try {
    const response = await fetch(productsUrl);

    if (!response.ok) {
      throw new Error("Products could not be loaded");
    }

    const data = await response.json();
    renderProducts(data.products);
  } catch (error) {
    console.error(error);
    showErrorMessage();
  }
}

showProductsButton.addEventListener("click", loadProducts);
