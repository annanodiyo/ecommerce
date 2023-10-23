const products=document.querySelector('.products')

const url_='https://fakestoreapi.com/products'



  async function fetchProducts(url) {
    try {
      let data = await fetch(url);
      let response = await data.json();

      response.forEach((product) => {
        let description = product.description;
        let title = product.title;
        products.innerHTML += `
          <div class="card">

            <img src="${product.image}" style="width: 18rem"  alt="...">
            <div class="card-body">

            <h5 class="card-title">${title.length > 20 ? description.substring(0, 20).concat('...') : title}</h5>

              <div class="product-price-container">
                <h3 class="product-price">$${product.price.toFixed(2)}</h3>
              </div>
              <div class = "btns">
              <input type="submit" value="Add To Cart">
              </div>
          </div>
        `;
      });
    } catch (err) {
      console.log(err);
    }
  }

  fetchProducts(url_)
